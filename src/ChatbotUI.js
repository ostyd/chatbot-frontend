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
      const response = await fet
