import React, { useState, useEffect } from 'react';
import MemberList from './MemberList';
import Messages from './Messages';
import UserProfile from './UserProfile';
import { FriendRequest } from './types';

interface Member {
  username: string;
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
}

const Chat: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMemberMessages, setSelectedMemberMessages] = useState([]);

  useEffect(() => {
    // Fetch friend requests
    const fetchFriendRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/users/friendrequest', {
          method: 'GET',
          headers: {
            'Authorization': `JWT ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch friend requests');
        }
        const data = await response.json();

        console.log(data);

        setFriendRequests(data);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    // Fetch members
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/users/members', {
          method: 'GET',
          headers: {
            'Authorization': `JWT ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch members');
        }
        const data = await response.json();
        console.log(data);

        setMembers(data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchFriendRequests();
    fetchMembers();
  }, []);

  useEffect(() => {
    if (selectedMember) {
      fetchMessages(selectedMember.username).then((messages) => {
        setSelectedMemberMessages(messages || []);
      });
    }
  }, [selectedMember]);

  const fetchMessages = async (memberId: string) => {
    try {
      console.log(memberId);

      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/messages?memberId=${memberId}`, {
        method: 'GET',
        headers: {
          'Authorization': `JWT ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return null;
    }
  };


  const loggedUser = localStorage.getItem('userData')
  console.log();

  const handleAcceptRequest = async (id: number) => {
    // setFriendRequests(friendRequests.filter((request) => request.id !== id));
    // Handle accept logic (e.g., updating the backend)

    console.log(id);


    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updateinterests/${id}`, {

        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('token')}`, // Assuming you're using JWT tokens
        },
        body: JSON.stringify({
          status: 'accepted',

        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Interest created successfully:', data);
    } catch (error) {
      console.error('Error creating interest:', error);
    }
  };

  const handleRejectRequest = async (id: number) => {
    // setFriendRequests(friendRequests.filter((request) => request.id !== id));
    // Handle reject logic (e.g., updating the backend)

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/updateinterests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('token')}`, // Assuming you're using JWT tokens
        },
        body: JSON.stringify({
          status: 'rejected',

        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Interest created successfully:', data);
    } catch (error) {
      console.error('Error creating interest:', error);
    }
  };
  const onConnectWithEmployee = async (username: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/interests/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('token')}`, // Assuming you're using JWT tokens
        },
        body: JSON.stringify({
          recipient: username,
          message: `request for ${username}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Interest created successfully:', data);
    } catch (error) {
      console.error('Error creating interest:', error);
    }
  };


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Section (UserProfile and MemberList) */}
      <div className="flex w-1/3 bg-white shadow-lg">
        <div className="w-full flex flex-col p-4">
          <div className="mb-4">
            <UserProfile
              user={loggedUser}
              friendRequests={friendRequests}
              onAcceptRequest={handleAcceptRequest}
              onRejectRequest={handleRejectRequest}
              onConnectWithEmployee={onConnectWithEmployee}
            />
          </div>
          <div>
            <MemberList members={members} onSelectMember={setSelectedMember} fetchMessages={fetchMessages} />
          </div>
        </div>
      </div>

      {/* Right Section (Messages) */}
      <div className="flex-1 p-4">
        {selectedMember && (
          <Messages loggedUser={loggedUser} selectedMember={selectedMember} selectedMemberMessage={selectedMemberMessages} />
        )}
      </div>
    </div>
  );
};

export default Chat;
