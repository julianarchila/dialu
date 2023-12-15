"use client";

import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ChatAgentPage() {
  const searchParams = useSearchParams();

  const storeId = searchParams.get("store");

  const { isLoading, error, mutateAsync } = api.chat.agent.useMutation();
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );

  if (!storeId) return <div>Store not found</div>;

  if (error) return <div>{error.message}</div>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);

    setInput("");
    try {
      const res = await mutateAsync({
        messages: [...messages, newMessage],
        storeId: parseInt(storeId),
      });

      setMessages([
        ...messages,
        newMessage,
        { role: "ai", content: res.output },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((m, index) => (
        <div key={index} className="whitespace-pre-wrap border-black">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      {isLoading && <div>loading...</div>}

      <div className="fixed bottom-0 w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="fixed bottom-0 w-full max-w-md"
        >
          <Input
            className="mb-8 p-2"
            disabled={isLoading}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something ..."
          />
        </form>
      </div>
    </div>
  );
}
