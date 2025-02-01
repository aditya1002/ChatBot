// export default ChatBot;
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faOm,faArrowUpLong,faXmark,faPaperclip} from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from '@mui/material';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';
//import { fa-arrow-up } from '@awesome.me/kit-KIT_CODE/icons'

const chatbotStyles = {
    chatbotContainer: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        
    },
    chatbotIcon: {
        backgroundColor: '#808080',
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
        width: '600px',
       //backgroundColor: '#f9f9f9',
       backgroundImage:
            "url(C:/Users/ADITYA/chat/src/owm4oa3hXUG58mka7hPvfP.jpg)",
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
        padding: '20px 10px',
        borderRadius: '20px',
        marginLeft: 'auto',
       // width:'20px',
       marginTop:'10px',
       marginRight:'100px',
        float:'left'
    },
    userMessage: {
        backgroundColor: '#948e8e',
      //  width:'10px',
        marginTop:'10px',
        padding: '5px 100px',
        borderRadius: '20px',
        marginRight: 'auto',
        marginBottom:'10px',
       float:'right'
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
        borderRadius: '20px',
        cursor: 'pointer',
    },
    send:{
        backgroundColor: '#000000',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '20px',
        cursor: 'pointer',
    },
    attachment:{
        marginTop:'20px',
        border:'none',
        float:'right',
        marginLeft:'350px'
    }
};

function ChatBot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [bot,setBotMessage] = useState([]);
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
   var [s,setS]= useState(0);
    const handleSendMessage = () => {
        if (input.trim() === '') return;
       
            setMessages([...messages, { role: 'user', text: input }]);
            setS(0);
        setInput('');
        const payload = {
            "user_query": input,
            // max_tokens: 150,
            "chat_history":[]
        }
        setS(s+1);
        apiHitter(payload);
    
    }
        const apiHitter= async(payload)=>{

            try {
              // Send the user message to the ChatGPT API
              const response = await axios.post(
               'http://dev1.vaultiq.ai:8000/vaults/DharmaGPT/kioskquery',
               payload,
               {
                   headers: {
                       'Content-Type': 'application/json',
                       // Add Authorization if needed
                       // 'Authorization': `Bearer ${YOUR_API_KEY}`,
                   },
               }
           );
           
           // Extract the bot response from the API response
           const botResponse = response.data;
           //  setInput('');
           // Add the bot response to the messages array
               setMessages([...messages, { role: 'user', text: input }]);
      //     setBotMessage(...bot,botResponse);
           console.log(botResponse);
           console.log(bot);
               console.log(s);
               console.log(s%2==0);
               
           
        } catch (error) {
               console.error('Error sending message:', error);
           }
       };
        
    const [hover, setHover] = useState(false);
    const onHover = () => {
      setHover(true);
    };
  
    const onLeave = () => {
      setHover(false);
    };
    const attacher=()=>{

    }
    return (
        <div style={chatbotStyles.chatbotContainer}>
            {isChatOpen ? (
                <div className="chatbot" style={{...chatbotStyles.chatbot,backgroundImage:"url('src\owm4oa3hXUG58mka7hPvfP.jpg')"}}>
                    <div className="chatbox">
                        <div className="messages" style={chatbotStyles.messages}>
                            {messages.map((message, index) => (
                                <div key={index} className="message" style={chatbotStyles.message}>
                                    {message.role==="bot" ? (
                                        <div className="bot-message" style={chatbotStyles.botMessage}>{bot}</div>
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
                            placeholder="Ask me anything about Dharma..."
                            style={chatbotStyles.input}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessage();
                                }} }
                        />
                        <Row>
                        <Col>
                        <button onClick={() => setIsChatOpen(false)} style={{ ...chatbotStyles.button,marginLeft:'20px',marginBottom:'10px',float:'left', backgroundColor: 'red', marginTop: '10px' }}>
                           <FontAwesomeIcon icon={faXmark} />
                        </button>
                        </Col>
                        <Col>
                        <button onClick={()=>attacher()} style={{...chatbotStyles.attachment}}>
                        <FontAwesomeIcon icon={faPaperclip} />
                        </button>
                        </Col>
                        <Col>
                        <button onClick={handleSendMessage} style={{...chatbotStyles.send,float:'right', marginTop:'10px'}}>
                         
                    <FontAwesomeIcon icon={faArrowUpLong} />
                        </button>
                        </Col>
                        </Row>
                    </div>
                </div>
            ) : (
                
                <Tooltip title="Explore Dharma">
                 <button
                    style={chatbotStyles.chatbotIcon}
                    onClick={() => setIsChatOpen(true)}
                >
               <FontAwesomeIcon icon={faOm} />
                </button> 
               </Tooltip>
            )}
        </div>
    );
}

export default ChatBot;
