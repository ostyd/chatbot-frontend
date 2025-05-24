import { useState } from 'react';

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Merhaba! Sana nasıl yardımcı olabilirim?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: 'user', text: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    try {
      const response = await fetch('https://chatbot-backend-production-8313.up.railway.app/api/getFlightSuggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Uçuşlar çekilemedi.' }]);
    }

    setInput('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <h2>✈️ Seyahat Asistanı</h2>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 8, marginBottom: 8 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === 'bot' ? 'left' : 'right' }}>
            <span style={{
              display: 'inline-block',
              padding: 8,
              borderRadius: 8,
              background: msg.sender === 'bot' ? '#e0f7fa' : '#c8e6c9',
              margin: 4
            }}>{msg.text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mesajını yaz..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleSend} style={{ padding: '8px 16px' }}>Gönder</button>
      </div>
    </div>
  );
}
