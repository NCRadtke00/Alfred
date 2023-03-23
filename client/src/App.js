import logo from './logo.svg';
import './App.css';
import "./normal.css";


function App() {
  return (
    <div className="App">
      <aside className='side-menu'>
        <div className='side-menu-button'>
          <span>+</span> New Chat
        </div>
      </aside>
      <section className="message-log">
        <div className='message-input-section'>
          <textarea className='message-input-textarea' placeholder="Enter your message here..."></textarea>
        </div>
      </section>
    </div>
  );
}

export default App;
