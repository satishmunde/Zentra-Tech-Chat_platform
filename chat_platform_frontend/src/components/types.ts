
// types.ts
export interface User {
    id: string;
    name: string;
    avatar: string;
    commonFriends?: string[];
  }
  
  export interface FriendRequest {
    id: string;
    requester: User;
  }

  