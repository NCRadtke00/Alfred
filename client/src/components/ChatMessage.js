import React from 'react';
import 'App.css';
function ChatMessage({ message }) {
    return (
        <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
            <p>{message.message}</p>
        </div>
    );
}

export default ChatMessage;
