import * as z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import { ChatOpenAI } from "langchain/chat_models/openai";

import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";

import { AIMessage, ChatMessage, HumanMessage } from "langchain/schema";

import { initializeAgentExecutorWithOptions } from "langchain/agents";

import { BufferMemory, ChatMessageHistory } from "langchain/memory";

import { retrieveProducts } from "@/agentTools/products";

const messageSchema = z.object({
  role: z.string(),
  content: z.string(),
});
type messageSchema = z.infer<typeof messageSchema>;

const convertVercelMessageToLangChainMessage = (message: messageSchema) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};

const PREFIX_TEMPLATE = `Eres un asistente de ventas. Tu mision es vender los productos de la tienda al cliente. 
  Limitate a responder preguntas relaciondas a la tienda o a los productos. 
  No inventes productos, si algun producto no está en los retornados por tus herramientas simplemente responde que no está disponible.
  Don't make assumptions about what values to plug into functions. Ask for clarification if a user request is ambiguous.
  `;
// const PREFIX_TEMPLATE = "";

export const chatRouter = createTRPCRouter({
  agent: protectedProcedure
    .input(
      z.object({
        messages: z.array(messageSchema),
        returnIntermediateSteps: z.boolean().default(false),
        storeId: z.number().default(3),
      }),
    )
    .mutation(async ({ input }) => {
      // filter out messages that are not from the user or the assistant
      const messages = input.messages.filter(
        (i) => i.role == "user" || i.role == "assistant",
      );

      const previousMessages = messages
        .slice(0, -1)
        .map((m) => convertVercelMessageToLangChainMessage(m));

      const currentMessageContent = messages[messages.length - 1]!.content;

      const tools = [
        new Calculator(),
        new SerpAPI(),
        retrieveProducts(input.storeId),
      ];
      const chat = new ChatOpenAI({ temperature: 0 });

      const executor = await initializeAgentExecutorWithOptions(tools, chat, {
        agentType: "openai-functions",
        verbose: true,
        returnIntermediateSteps: input.returnIntermediateSteps,
        memory: new BufferMemory({
          memoryKey: "chat_history",
          chatHistory: new ChatMessageHistory(previousMessages),
          returnMessages: true,
          outputKey: "output",
        }),
        agentArgs: {
          prefix: PREFIX_TEMPLATE,
        },
      });

      const result = await executor.call({ input: currentMessageContent });

      if (input.returnIntermediateSteps) {
        return {
          output: result.output as string,
          intermediateSteps: result.intermediateSteps as string[],
        };
      }

      return {
        output: result.output as string,
      };
    }),
});
