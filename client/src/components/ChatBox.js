import React from 'react';
import ChatMessage from './ChatMessage';
import '../App.css';

function ChatBox({ chatLog, input, setInput, handleSubmit }) {
    return (
        <section className="chat-box">
            <div className="chat-log">
                {chatLog.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                ))}
            </div>
            <div className="chat-input-holder">
                <form onSubmit={handleSubmit}>
                    <input
                        rows="1"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="chat-input-textarea"
                    ></input>
                </form>
            </div>
        </section>
    );
}

export default ChatBox;