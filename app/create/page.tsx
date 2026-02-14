"use client";

import { useState } from "react";

export default function CreatePage() {
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">

      <h1 className="text-3xl font-bold">Create Your Card 💌</h1>

      {/* Message Input */}
      <div className="w-full max-w-md flex flex-col gap-2">
        <textarea
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  maxLength={200}
  placeholder="Write your message..."
  className="border rounded-lg p-3 min-h-[120px] resize-none outline-none focus:ring-2 focus:ring-pink-400"
/>


        {/* Character Counter */}
        <p
  className={`text-sm text-right ${
    message.length > 180 ? "text-red-500" : "text-gray-500"
  }`}
>
  {message.length}/200 characters
</p>

      </div>

    </div>
  );
}
