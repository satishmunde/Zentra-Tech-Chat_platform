// UserProfile.tsx
import React, { useState } from 'react';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBCard,
    MDBCardText,
    MDBCardTitle,
    MDBDropdownItem,
    MDBBtn,
} from 'mdb-react-ui-kit';
import { User, FriendRequest } from './types';

interface UserProfileProps {
    user: User;
    friendRequests: FriendRequest[];
    onAcceptRequest: (id: string) => void;
    onRejectRequest: (id: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
    user,
    friendRequests,
    onAcceptRequest,
    onRejectRequest,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm">
            <MDBNavbarBrand href="#">Chat App</MDBNavbarBrand>
            <MDBNavbarNav className="ms-auto">
                <MDBNavbarItem>
                    <MDBDropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
                        <MDBDropdownToggle nav caret>
                            <img
                                src={user.avatar}
                                alt="avatar"
                                className="rounded-circle"
                                width="40"
                            />
                            <span className="ms-2">{user.name}</span>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu style={{ minWidth: '500px' }}>
                            <MDBDropdownItem header className="py-2 px-3 w-30">
                                Friend Requests
                            </MDBDropdownItem>
                            {friendRequests.map((request) => (
                                <MDBDropdownItem key={request.id} className="py-2">
                                    <MDBCard className="p-3">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={request.requester.avatar}
                                                alt="avatar"
                                                className="rounded-circle"
                                                width="30"
                                            />
                                            <div className="ms-3">
                                                <MDBCardTitle className="mb-0">{request.requester.name}</MDBCardTitle>
                                                <MDBCardText className="small text-muted">
                                                    Common Friends: {request.requester.commonFriends?.join(', ') || 'None'}
                                                </MDBCardText>
                                            </div>
                                            <div className="ms-auto">
                                                <MDBBtn
                                                    size="sm"
                                                    color="success"
                                                    onClick={() => onAcceptRequest(request.id)}
                                                >
                                                    Accept
                                                </MDBBtn>
                                                <MDBBtn
                                                    size="sm"
                                                    color="danger"
                                                    onClick={() => onRejectRequest(request.id)}
                                                >
                                                    Reject
                                                </MDBBtn>
                                            </div>
                                        </div>
                                    </MDBCard>
                                </MDBDropdownItem>
                            ))}
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </MDBNavbarItem>
            </MDBNavbarNav>
        </MDBNavbar>
    );
};

export default UserProfile;
