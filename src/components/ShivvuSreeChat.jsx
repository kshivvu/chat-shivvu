import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./ShivvuSreeChat.css";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default function ShivvuSreeChat() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const finalPrompt = `You are Shivvu, the loving, playful boyfriend of Sree... Respond in 2-3 lines max. Now respond to: ${prompt}`;

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(finalPrompt);
      const text = result.response.text();

      setMessages((prev) => [
        ...prev,
        { sender: "sree", text: prompt },
        { sender: "shivvu", text },
      ]);
      setPrompt("");
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "shivvu", text: "Oops, baby! Something went wrong 😅" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">💖 Your Shivvu 💖</h2>

      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-bubble ${
              msg.sender === "sree" ? "sree-msg" : "shivvu-msg"
            }`}
          >
            <strong>{msg.sender === "sree" ? "Sree 💖" : "Shivvu 💕"}</strong>
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <p className="typing">Typing... 💭</p>}
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <textarea
          rows="2"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Talk to Shivvu..."
        />
        <button type="submit" disabled={loading}>
          {loading ? "💭..." : "❤️ Send"}
        </button>
      </form>
    </div>
  );
}
