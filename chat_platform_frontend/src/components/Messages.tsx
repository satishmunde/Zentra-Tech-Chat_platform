import React, { useEffect, useState, useRef } from 'react';
import { MDBCol, MDBTypography, MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBTextArea, MDBBtn } from 'mdb-react-ui-kit';

interface Message {
    id: string;
    sender: string;
    recipient: string;
    message: string;
    time: string;
}

interface Member {
    name: string;
    avatar: string;
}

interface MessagesProps {
    selectedMember: Member | null;
}

const Messages: React.FC<MessagesProps> = ({ selectedMember }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log('Connecting to WebSocket server...');
        const newSocket = new WebSocket('ws://127.0.0.1:8001/ws/chat/satish/');
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log('WebSocket connected successfully!');
            setIsSocketConnected(true);
        };

        newSocket.onmessage = (event) => {
            try {
                const newMessage: Message = JSON.parse(event.data);
                console.log('Received message:', newMessage);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        };

        newSocket.onerror = (error) => {
            console.error('WebSocket error:', error);
            if (error instanceof Event) {
                console.error('Error details:', {
                    readyState: newSocket.readyState,
                    url: newSocket.url,
                    protocol: newSocket.protocol,
                });
            }
        };

        newSocket.onclose = (event) => {
            console.log('WebSocket disconnected:', event);
            if (event.code !== 1000) { // Not a normal closure
                console.error('Abnormal WebSocket closure:', event);
            }
            setIsSocketConnected(false);
        };

        return () => {
            console.log('Closing WebSocket connection...');
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = () => {
        if (socket && message.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                recipient: 'munde',
                sender: 'satish',
                message: message,
                time: new Date().toLocaleTimeString(),
            };

            if (socket.readyState === WebSocket.OPEN) {
                console.log('Sending message:', newMessage);
                socket.send(JSON.stringify(newMessage));
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                setMessage('');
            } else {
                console.log('WebSocket is not open. Ready state: ', socket.readyState);
            }
        }
    };

    if (!selectedMember) {
        return <div>Please select a member to message with.</div>;
    }

    return (
        <MDBCol md="6" lg="5" xl="6" className="mb-4 mb-mb-0">
            <h5 className="font-weight-bold mb-3 text-center text-lg-start">
                Messages with {selectedMember.name}
            </h5>
            <div id="messages-container" className="overflow-scroll" style={{ maxHeight: '75vh', maxWidth: '65vw', minHeight: '75vh', minWidth: '65vw', border: '2px solid red' }}>
                <MDBTypography listUnStyled>
                    {messages.map((msg) => (
                        <li
                            key={msg.id}
                            className={`d-flex justify-content-${msg.sender === 'satish' ? 'end' : 'start'} mb-4`}
                        >
                            <MDBCard className="w-50">
                                <MDBCardHeader className="d-flex justify-content-between p-3">
                                    <p className="fw-bold mb-0">{msg.sender}</p>
                                    <p className="text-muted small mb-0">
                                        <MDBIcon far icon="clock" /> {msg.time}
                                    </p>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <p className="mb-0">{msg.message}</p>
                                </MDBCardBody>
                            </MDBCard>
                            <img
                                src={msg.sender === 'satish' ? 'your-avatar-url' : selectedMember.avatar}
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                width="60"
                            />
                        </li>
                    ))}
                </MDBTypography>
                <div ref={messagesEndRef}></div>
            </div>
            <div className='flex m-6' style={{ minWidth: '60vw' }}>
                <MDBTextArea
                    label="Message"
                    id="textAreaExample"
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-3"
                />
                <div className='flex justify-end' style={{ marginLeft: '20px' }}>
                    <MDBBtn color="info" rounded className="" onClick={sendMessage}>
                        Send
                    </MDBBtn>
                </div>
            </div>
        </MDBCol>
    );
};

export default Messages;
