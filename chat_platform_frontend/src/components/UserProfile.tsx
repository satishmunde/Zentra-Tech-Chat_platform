// UserProfile.tsx

import React, { useState, useEffect } from 'react';
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
    onAcceptRequest: (id: number) => void;
    onRejectRequest: (id: number) => void;
    onConnectWithEmployee: (username: string) => void; // Add this prop for connecting with employees
}

const UserProfile: React.FC<UserProfileProps> = ({
    user,
    friendRequests,
    onAcceptRequest,
    onRejectRequest,
    onConnectWithEmployee,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [employees, setEmployees] = useState<User[]>([]);
    const [showEmployees, setShowEmployees] = useState(false);

    useEffect(() => {
        // Function to fetch data from API
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from local storage
                const response = await fetch('http://127.0.0.1:8000/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`, // Send the token in the Authorization header
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch employees');
                }
                const data = await response.json();
                setEmployees(data); // Update state with fetched data
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees(); // Call the function to fetch data when component mounts
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleConnectClick = async () => {
        setShowEmployees(!showEmployees);
        if (!showEmployees) {
            // Fetch employees from API
            try {
                const token = localStorage.getItem('token'); // Get the token from local storage
                const response = await fetch('http://127.0.0.1:8000/auth/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`, // Send the token in the Authorization header
                    },
                });
                const data = await response.json();
                setEmployees(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        }
    };

    return (
        <MDBNavbar expand="lg" light bgColor="light" className="shadow-sm">
            <MDBNavbarBrand href="#">Chat App</MDBNavbarBrand>
            <MDBNavbarNav className="ms-auto">

                <MDBNavbarItem>
                    <MDBDropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>



                        <MDBDropdownToggle nav caret>Friend Request


                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-menu-lg-end" style={{ minWidth: '400px' }}>
                            <MDBDropdownItem header className="py-2 px-3">
                                Friend Requests
                            </MDBDropdownItem>

                            {friendRequests.map((request) => (
                                <MDBDropdownItem key={request.username} className="py-2">
                                    <MDBCard className="p-3">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={request.profile_pictures}
                                                alt="avatar"
                                                className="rounded-circle"
                                                width="30"
                                            />
                                            <div className="ms-3">
                                                <MDBCardTitle className="mb-0">{`${request.first_name} ${request.last_name}`}</MDBCardTitle>
                                                <MDBCardText className="small text-muted">
                                                    Common Friends:
                                                </MDBCardText>
                                            </div>
                                            <div className="ms-auto">
                                                <MDBBtn
                                                    size="sm"
                                                    color="success"
                                                    onClick={() => onAcceptRequest(request.request_id)}
                                                >
                                                    Accept
                                                </MDBBtn>
                                                <MDBBtn
                                                    size="sm"
                                                    color="danger"
                                                    onClick={() => onRejectRequest(request.request_id)}
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
                <MDBNavbarItem>
                    <MDBDropdown isOpen={showEmployees} toggle={handleConnectClick} popperConfig={{ modifiers: [{ name: 'offset', options: { offset: [0, 10] } }] }}>
                        <MDBDropdownToggle nav caret>
                            Connect with People
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-menu-lg-end" style={{ minWidth: '400px' }}>
                            <MDBDropdownItem header className="py-2 px-3">
                                Friend Suggestion
                            </MDBDropdownItem>
                            {employees.map((emp) => (


                                <MDBDropdownItem key={emp.username} className="py-2">

                                    <MDBCard className="p-3">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={emp.profile_pictures}
                                                alt="avatar"
                                                className="rounded-circle"
                                                width="30"
                                            />
                                            <div className="ms-3">
                                                <MDBCardTitle className="mb-0">{`${emp.first_name} ${emp.last_name}`}</MDBCardTitle>
                                                <MDBCardText className="small text-muted">
                                                    Position: {`${emp.phone_number} `}
                                                </MDBCardText>
                                            </div>
                                            <div className="ms-auto">
                                                <MDBBtn size="sm" color="info" onClick={() => onConnectWithEmployee(emp.username)}>
                                                    Connect
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
