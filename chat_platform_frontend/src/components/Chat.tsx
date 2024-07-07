


import React, { useState } from 'react';
import MemberList from './MemberList';

import Messages from './Messages';
import { User, FriendRequest } from './types';
import UserProfile from './UserProfile';

interface Member {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
}

const Chat: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);


  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    {
      id: '1',
      requester: {
        id: '2',
        name: 'Jane Doe',
        avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp',
        commonFriends: ['John Smith', 'Mary Johnson'],
      },
    },
    {
      id: '2',
      requester: {
        id: '3',
        name: 'Michael Brown',
        avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-9.webp',
        commonFriends: ['John Smith'],
      },
    },
  ]);

  const loggedUser: User = {
    id: '1',
    name: 'John Smith',
    avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp',
  };

  const handleAcceptRequest = (id: string) => {
    setFriendRequests(friendRequests.filter((request) => request.id !== id));
    // Handle accept logic (e.g., updating the backend)
  };

  const handleRejectRequest = (id: string) => {
    setFriendRequests(friendRequests.filter((request) => request.id !== id));
    // Handle reject logic (e.g., updating the backend)
  };

  const members: Member[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp',
      lastMessage: 'Hello, Are you there?',
      lastMessageTime: 'Just now',
      unreadCount: 1,
    },
    {
      id: '2',
      name: 'Danny Smith',
      avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp',
      lastMessage: 'Lorem ipsum dolor sit.',
      lastMessageTime: '5 mins ago',
    },
    {
      id: '3',
      name: 'Brad Pitt',
      avatar: 'https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp',
      lastMessage: 'Lorem ipsum dolor sit.',
      lastMessageTime: '5 mins ago',
    },
  ];

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
            />
          </div>
          <div>
            <MemberList members={members} onSelectMember={setSelectedMember} />
          </div>
        </div>
      </div>

      {/* Right Section (Messages) */}
      <div className="flex-1 p-4">
        <Messages selectedMember={selectedMember} />
      </div>
    </div>
  );
};

export default Chat;
