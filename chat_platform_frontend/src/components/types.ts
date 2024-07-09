export interface Member {
  id: string;
  name: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
}

export interface User {
  phone_number: string;
  last_name: string;
  first_name: string;
  profile_pictures: string | undefined;
  id: string;
  username: string;
  email: string;
  // Add other properties as needed
}

export interface FriendRequest {
  profile_pictures: string | undefined;
  username: string ;
  id: string;
  sender: string;
  receiver: string;
  status: string;
}
