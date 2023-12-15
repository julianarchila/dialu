"use client";

import { useChat } from "ai/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [disabled, setDisable] = useState(false);

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md">
        <Input
          className="mb-8 p-2"
          value={input}
          disabled={disabled}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <Button variant="ghost" onClick={() => setDisable(!disabled)}>
          {disabled ? "enable" : "disable"}
        </Button>
      </form>
    </div>
  );
}
