import "./App.css";
import "./normal.css";
import { useState } from "react";
import ChatMessage from "./message";

function App({ message }) {
  const [input, setInput] = useState("");
  const [chatlog, setChatlog] = useState([
    {
      user: "gpt",
      message: "How can I help you today ?",
    },
    {
      user: "me",
      message: "I want to use ChatGPT today",
    },
  ]);

  const clearChat =()=>{
    setChatlog([])
  }

  //clear chart

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    let chatLogNew=[...chatlog, { user: "me", message: `${input}` }];
    setInput("");
    setChatlog(chatLogNew);

       
 const messages =  chatLogNew.map((message) => message.message).join("\n")

    const response = await fetch("http://localhost:3001/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        message:messages
       }),
    });
    const data = await response.json();
    setChatlog([...chatLogNew, { user: "me", message: `${data.message}` }]);
    console.log(data.message);
  }

  return (
    <>
      <div className="App">
        <aside className="side-menu">
          <div className="side-menu-button" onClick={clearChat}>
            <span>+</span>
            New chart
          </div>
        </aside>

        <section className="chart-box">
          <div className="chat-log">
            {/* <div className="chat-message chatgpt">
              <div className="chat-message-center">
                <div className="avatar chatgpt"></div>
                <div className="message">I am a I</div>
              </div>
            </div> */}

            {chatlog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {/* <div className="chat-message chatgpt">
              <div className="chat-message-center">
                <div className="avatar chatgpt"></div>
                <div className="message">I am a AI</div>
              </div>
            </div> */}
          </div>

          <div className="chart-input-holder">
            <form onSubmit={handleSubmit}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="chart-input-textarea"
                placeholder="Type your concent here....."
              ></input>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
