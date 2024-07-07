import React from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

interface Member {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount?: number;
}

interface MemberListProps {
    members: Member[];
    onSelectMember: (member: Member) => void;
}

const MemberList: React.FC<MemberListProps> = ({ members, onSelectMember }) => {
    return (
        <MDBCol md="6" lg="5" xl="12" className="mb-4 mb-md-0">
            <h5 className="font-weight-bold mb-3 text-center text-lg-start">Member</h5>
            <MDBCard>
                <MDBCardBody>
                    <MDBTypography listUnStyled className="mb-0">
                        {members.map((member) => (
                            <li
                                key={member.id}
                                className="p-2 border-bottom"
                                style={{ backgroundColor: member.unreadCount ? '#eee' : 'transparent' }}
                                onClick={() => onSelectMember(member)}
                            >
                                <a href="#!" className="d-flex justify-content-between">
                                    <div className="d-flex flex-row">
                                        <img
                                            src={member.avatar}
                                            alt="avatar"
                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                            width="60"
                                        />
                                        <div className="pt-1">
                                            <p className="fw-bold mb-0">{member.name}</p>
                                            <p className="small text-muted">{member.lastMessage}</p>
                                        </div>
                                    </div>
                                    <div className="pt-1">
                                        <p className="small text-muted mb-1">{member.lastMessageTime}</p>
                                        {member.unreadCount ? (
                                            <span className="badge bg-danger float-end">{member.unreadCount}</span>
                                        ) : (
                                            <span className="text-muted float-end">
                                                <MDBIcon fas icon="check" />
                                            </span>
                                        )}
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
