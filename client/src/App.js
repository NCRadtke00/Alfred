import './App.css';
import "./normal.css";
import { useState, useEffect } from 'react';
import SideMenu from './SideMenu';
import ChatBox from './ChatBox';

function App() {
  const [input, setInput] = useState("");
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState('ada');
  const [chatLog, setChatLog] = useState([{ user: "gpt", message: "Hello, how may I help you?" }]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getEngines() {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3080/models');
        const data = await response.json();
        setModels(data.models);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    getEngines();
  }, []);

  function clearChat() {
    setChatLog([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);
    const messages = chatLogNew.map((message) => message.message).join('\n')

    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
      })
    });
    const data = await response.json()
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }])
  }

  return (
    <div className="App">
      <SideMenu models={models} setCurrentModel={setCurrentModel} clearChat={clearChat} isLoading={isLoading} />
      <ChatBox chatLog={chatLog} input={input} setInput={setInput} handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;