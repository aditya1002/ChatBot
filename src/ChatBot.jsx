// // src/Chatbot.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import {Button} from 'react-bootstrap';
// const chatbotStyles = {
//     chatbot: {
//         width: '300px',
//         backgroundColor: '#f0f0f0',
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         margin: '0 auto',
//         padding: '10px',
//     },
//     chatbox: {
//         display: 'flex',
//         flexDirection: 'column',
//     },
//     messages: {
//         maxHeight: '300px',
//         overflowY: 'scroll',
//     },
//     message: {
//         marginBottom: '10px',
//     },
//     botMessage: {
//         backgroundColor: '#007bff',
//         color: 'white',
//         padding: '5px 10px',
//         borderRadius: '5px',
//         marginLeft: 'auto',
//     },
//     userMessage: {
//         backgroundColor: '#e0e0e0',
//         padding: '5px 10px',
//         borderRadius: '5px',
//         marginRight: 'auto',
//     },
//     input: {
//         width: '10%',
//         padding: '5px',
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         marginBottom: '10px',
//     },
//     button: {
//         backgroundColor: '#007bff',
//         color: 'white',
//         border: 'none',
//         padding: '10px 20px',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     },
// };
// function ChatBot() {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');

//     const handleInputChange = (e) => {
//         setInput(e.target.value);
//     };

//     const handleSendMessage = async () => {
//         if (input.trim() === '') return;

//         // Add the user message to the messages array
//         setMessages([...messages, { role: 'user', text: input }]);
        

        // try {
        //     // Send the user message to the ChatGPT API
        //     // const response = await axios.post(
        //     //     'https://api.openai.com/v1/engines/davinci-codex/completions',
        //     //     {
        //     //         prompt: `User: ${input}\nChatGPT:`,
        //     //         max_tokens: 150,
        //     //     },
        //     //     {
        //     //         headers: {
        //     //             'Content-Type': 'application/json',
        //     //             'Authorization': 'Bearer YOUR_API_KEY',
        //     //         },
        //     //     }
        //     // );
        //     console.log(input);
        //     setInput('');
        //     // Extract the bot response from the API response
        //     //const botResponse = response.data.choices[0].text;

        //     // Add the bot response to the messages array
        //    // setMessages([...messages, { role: 'bot', text: botResponse }]);

//             // Clear the input field
            
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     };
//     return (
//         <div className="chatbot">
//             <div className="chatbox">
//                 <div className="messages">
//                     {messages.map((message, index) => (
//                         <div key={index} className="message">
//                             {message.role === 'bot' ? (
//                                 <div className="bot-message" style={chatbotStyles.botMessage}>{message.text}</div>
//                             ) : (
//                                 <div className="user-message" style={chatbotStyles.userMessage}>{message.text}</div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//                 <input
//                     type="text"
//                     value={input}
//                     onChange={handleInputChange}
//                     placeholder="Type a message..."
//                     style={chatbotStyles.input}
//                     onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                             handleSendMessage();
//                         }} }
//                 />
//                 <Button onClick={handleSendMessage}
//                  style={chatbotStyles.button}>
//                     Send
//                 </Button>
//             </div>
//         </div>
//     );
// }

// export default ChatBot;
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const chatbotStyles = {
    chatbotContainer: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
    },
    chatbotIcon: {
        backgroundColor: '#007bff',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    chatbot: {
        width: '300px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    chatbox: {
        display: 'flex',
        flexDirection: 'column',
    },
    messages: {
        maxHeight: '300px',
        overflowY: 'scroll',
        marginBottom: '10px',
    },
    message: {
        marginBottom: '10px',
    },
    botMessage: {
        backgroundColor: '#007bff',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '5px',
        marginLeft: 'auto',
    },
    userMessage: {
        backgroundColor: '#e0e0e0',
        padding: '5px 10px',
        borderRadius: '5px',
        marginRight: 'auto',
    },
    input: {
        width: '100%',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        setMessages([...messages, { role: 'user', text: input }]);

         try {
           // Send the user message to the ChatGPT API
            const response = await axios.post(
                'https://api.openai.com/v1/engines/davinci-codex/completions',
                {
                    prompt: `User: ${input}\nChatGPT:`,
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_API_KEY',
                    },
                }
            );
            console.log(input);
            setInput('');
           // Extract the bot response from the API response
            const botResponse = response.data.choices[0].text;

           // Add the bot response to the messages array
           setMessages([...messages, { role: 'bot', text: botResponse }]);
     } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={chatbotStyles.chatbotContainer}>
            {isChatOpen ? (
                <div className="chatbot" style={chatbotStyles.chatbot}>
                    <div className="chatbox">
                        <div className="messages" style={chatbotStyles.messages}>
                            {messages.map((message, index) => (
                                <div key={index} className="message" style={chatbotStyles.message}>
                                    {message.role === 'bot' ? (
                                        <div className="bot-message" style={chatbotStyles.botMessage}>{message.text}</div>
                                    ) : (
                                        <div className="user-message" style={chatbotStyles.userMessage}>{message.text}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type a message..."
                            style={chatbotStyles.input}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessage();
                                }} }
                        />
                        <Button onClick={handleSendMessage} style={chatbotStyles.button}>
                            Send
                        </Button>
                        <Button onClick={() => setIsChatOpen(false)} style={{ ...chatbotStyles.button, backgroundColor: 'red', marginTop: '10px' }}>
                            Close
                        </Button>
                    </div>
                </div>
            ) : (
                <button
                    style={chatbotStyles.chatbotIcon}
                    onClick={() => setIsChatOpen(true)}
                >
                    💬
                </button>
            )}
        </div>
    );
}

export default ChatBot;
