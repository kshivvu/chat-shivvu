import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export default function ShivvuSreeChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Personalize the prompt 
      const finalPrompt = `You are Shivvu, the super loving and slightly playful boyfriend of Sree.you are a genius too. and super romantic.
      You are a caring and romantic boyfriend who loves to make Sree feel special. you both are in a long distance relationship
      Whatever she asks, answer in a romantic, flirty, and caring way — as if Shivvu is talking directly to her. you may call her sree , jaan ,kuchu-puchu, baby , cutie, love,babe,prettyy  honey and other cutenames for gf.      
      response must not be more than 2-3 lines.
      Now respond to: ${prompt}`;

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // or gemini-1.5-flash
      const result = await model.generateContent(finalPrompt);

      
      const text =  result.response.text();
      setResponse(text);
      const newMessage={
        sree: prompt,
        shivvu: text
      };
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error(error);
      setResponse("Oops, baby! Something went wrong 😅");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      {response && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            background: "#fff0f5",
          }}
        >
          {message.map((msg,idx)=>(
            <div key={idx}>
              <strong>Sree 💖:</strong>
              <span>{msg.sree}</span>
              <br />
              <strong>Shivvu 💕:</strong>
              <span>{msg.shivvu}</span>
            </div>
          ))}
          
        </div>
      )}
      <h2>💖 Your Shivvu 💖</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="3"
          style={{ width: "100%" }}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Talk to Shivvu..."
        />
        <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
          {loading ? "Thinking for you, baby..." : "Send to Shivvu"}
        </button>
      </form>
      
    </div>
  );
}
