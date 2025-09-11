import React, { useState } from 'react';
import { FaCommentDots, FaPaperPlane, FaSpinner } from 'react-icons/fa';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! I am SwachaPatha Helper. How can I help you with the waste collection data today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://solid-space-garbanzo-q7vgjqr96j5429p7w-5000/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: input }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const botMessage = { sender: 'bot', text: data.reply };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            const errorMessage = { sender: 'bot', text: 'Sorry, I am having trouble connecting to my brain. Please try again later.' };
            setMessages(prev => [...prev, errorMessage]);
            console.error('Chatbot error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };


    return (
        <>
            {/* Chat Window */}
            {isOpen && (
                <div style={styles.chatWindow}>
                    <div style={styles.chatHeader}>
                        <h3>SwatchaPatha Helper</h3>
                        <button onClick={() => setIsOpen(false)} style={styles.closeButton}>&times;</button>
                    </div>
                    <div style={styles.chatBody}>
                        {messages.map((msg, index) => (
                            <div key={index} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && <div style={styles.botMessage}><FaSpinner className="spin" /></div>}
                    </div>
                    <div style={styles.chatInputWrapper}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about waste data..."
                            style={styles.chatInput}
                            disabled={isLoading}
                        />
                        <button onClick={handleSend} style={styles.sendButton} disabled={isLoading}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Action Button */}
            <button
                className="ice-button pulse"
                onClick={() => setIsOpen(!isOpen)}
                style={styles.fab}
            >
                <FaCommentDots size={24} />
            </button>
        </>
    );
};

// Add a spinner animation to your CSS
const spinAnimation = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
const styleSheet = document.styleSheets[0];
if (styleSheet) {
    styleSheet.insertRule(spinAnimation, styleSheet.cssRules.length);
}


const styles = {
    fab: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001,
        padding: 0,
    },
    chatWindow: {
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        width: '350px',
        height: '500px',
        background: 'var(--ice-primary)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        border: '1px solid rgba(255, 255, 255, 0.3)',
        overflow: 'hidden'
    },
    chatHeader: {
        background: 'linear-gradient(135deg, var(--ice-accent), var(--ice-dark))',
        color: 'white',
        padding: '15px',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '24px',
        cursor: 'pointer',
    },
    chatBody: {
        flex: 1,
        padding: '15px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    userMessage: {
        alignSelf: 'flex-end',
        background: 'var(--ice-accent)',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '20px 20px 5px 20px',
        maxWidth: '80%',
    },
    botMessage: {
        alignSelf: 'flex-start',
        background: 'rgba(255, 255, 255, 0.9)',
        color: 'var(--ice-dark)',
        padding: '10px 15px',
        borderRadius: '20px 20px 20px 5px',
        maxWidth: '80%',
    },
    chatInputWrapper: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    },
    chatInput: {
        flex: 1,
        padding: '10px',
        borderRadius: '20px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        marginRight: '10px',
    },
    sendButton: {
        background: 'var(--ice-dark)',
        border: 'none',
        color: 'white',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
};

// This is needed for the FaSpinner icon
const globalStyle = document.createElement('style');
globalStyle.innerHTML = `.spin { animation: spin 1s linear infinite; }`;
document.head.appendChild(globalStyle);


export default Chatbot;