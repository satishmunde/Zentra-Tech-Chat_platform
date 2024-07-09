import React, { useState } from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';

interface Member {
    id: string;
    first_name: string;
    last_name: string;
    profile_pictures: string;
    username: string;
    email: string;
}

interface MemberListProps {
    members: Member[];
    onSelectMember: (member: Member | null) => void;
    fetchMessages: (memberId: string) => Promise<unknown>;
}

const MemberList: React.FC<MemberListProps> = ({ members, onSelectMember, fetchMessages }) => {
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

    const handleMemberSelect = async (member: Member) => {

        console.log(member)
        onSelectMember(member);
        console.log(member.username);

        setSelectedMemberId(member.username);
        const messages = await fetchMessages(member.username);
        // Handle messages loading or display logic here
        console.log(messages);
    };

    return (
        <MDBCol md="6" lg="5" xl="12" className="mb-4 mb-md-0">
            <h5 className="font-weight-bold mb-3 text-center text-lg-start">Members</h5>
            <MDBCard>
                <MDBCardBody>
                    <MDBTypography listUnStyled className="mb-0">
                        {members.map((member) => (
                            <li
                                key={member.username}
                                className={`p-2 border-b cursor-pointer ${member.username === selectedMemberId ? 'bg-gray-200' : 'bg-transparent'} hover:bg-gray-100 transition-colors duration-200`}
                                onClick={() => handleMemberSelect(member)}
                            >
                                <a href="#!" className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        <img
                                            src={member.profile_pictures}
                                            alt="avatar"
                                            className="rounded-full me-3 shadow-lg"
                                            width="60"
                                        />
                                        <div className="pl-2">
                                            <p className="font-bold mb-0">{`${member.username} `}</p>
                                            <p className="font-bold mb-0">{`${member.first_name} ${member.last_name}`}</p>

                                            <p className="text-gray-500 mb-0">{member.email}</p>
                                        </div>
                                    </div>

                                </a>
                            </li>
                        ))}
                    </MDBTypography>

                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    );
};

export default MemberList;
