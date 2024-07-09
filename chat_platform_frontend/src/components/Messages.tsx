import React, { useEffect, useState, useRef } from 'react';
import {
    MDBCol,
    MDBTypography,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBTextArea,
    MDBBtn,
} from 'mdb-react-ui-kit';

interface Message {
    timestamp: string | null | undefined;

    sender: string;
    recipient: string;
    content: string;

}

interface Member {
    username: string;
    name: string;
    avatar: string;
}

interface MessagesProps {
    selectedMember: Member | null;
    selectedMemberMessage: Message[];
    loggedUser: string;
}

const Messages: React.FC<MessagesProps> = ({ loggedUser, selectedMember, selectedMemberMessage }) => {
    const [messages, setMessages] = useState<Message[]>(selectedMemberMessage);
    const [message, setMessage] = useState<string>('');
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedMember) {
            setMessages(selectedMemberMessage.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()));
            const newSocket = new WebSocket(`ws://127.0.0.1:8001/ws/chat/${JSON.parse(loggedUser).username}/`);
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
        }
    }, [loggedUser, selectedMember, selectedMemberMessage]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);
    console.log(selectedMemberMessage);


    const sendMessage = () => {
        if (socket && message.trim()) {
            const newMessage: Message = {
                recipient: selectedMember!.username,
                sender: JSON.parse(loggedUser).username, // Assuming the logged-in user's name is 'satish'
                content: message,
                timestamp: ""
            };
            console.log(loggedUser);


            if (socket.readyState === WebSocket.OPEN) {
                console.log('Sending message:', newMessage);

                // Send message via WebSocket
                socket.send(JSON.stringify(newMessage));

                // Prepare data for API POST request
                const token = localStorage.getItem('token');

                console.log(token);

                const apiUrl = `http://127.0.0.1:8000/api/messages/?memberId=${selectedMember!.username}`;



                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                    body: JSON.stringify({

                        recipient_id: selectedMember!.username,
                        sender_id: JSON.parse(loggedUser).username, // Assuming the logged-in user's name is 'satish'
                        content: message,

                    }),
                };

                // Make API POST request
                fetch(apiUrl, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to send message');
                        }
                        return response;
                    })
                    .then(data => {
                        console.log('Message sent successfully:', data);
                        // Optionally update state or handle success feedback
                    })
                    .catch(error => {
                        console.error('Error sending message:', error);
                        // Optionally handle error or show error message to user
                    });

                // Update local state after sending message
                setMessages(prevMessages => [...prevMessages, newMessage]);
                setMessage('');
            }
            else {
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
                Messages with {selectedMember.username}
            </h5>
            <div
                id="messages-container"
                className="overflow-scroll"
                style={{
                    maxHeight: '75vh',
                    maxWidth: '65vw',
                    minHeight: '75vh',
                    minWidth: '65vw',
                    border: '2px solid red',
                }}
            >
                <MDBTypography listUnStyled>
                    {messages.map((msg) => {
                        // Convert the timestamp to a Date object
                        const date = new Date(msg.timestamp);

                        // Format the date as a local time string
                        const formattedTimestamp = date.toLocaleString();

                        return (
                            <li
                                key={msg.timestamp}
                                className={`d-flex justify-content-${msg.sender === JSON.parse(loggedUser).username ? 'end' : 'start'} mb-4`}
                            >
                                <MDBCard className="w-50">
                                    <MDBCardHeader className="d-flex justify-content-between p-3">
                                        <p className="fw-bold mb-0">{msg.sender}</p>
                                        <p className="text-muted small mb-0">
                                            {formattedTimestamp == 'Invalid Date' ? 'now' : formattedTimestamp}
                                        </p>
                                    </MDBCardHeader>
                                    <MDBCardBody>
                                        <p className="mb-0">{msg.content}</p>
                                    </MDBCardBody>
                                </MDBCard>
                            </li>
                        );
                    })}
                </MDBTypography>

                <div ref={messagesEndRef}></div>
            </div>
            <div className="flex m-6" style={{ minWidth: '65vw' }}>
                <MDBTextArea
                    label="Message"
                    id="textAreaExample"
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-3"
                />
                <div className="flex justify-end" style={{ marginLeft: '20px' }}>
                    <MDBBtn color="info" rounded onClick={sendMessage}>
                        Send
                    </MDBBtn>
                </div>
            </div>
        </MDBCol>
    );
};

export default Messages;
