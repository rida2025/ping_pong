import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function ContactItem({ contact, currentUser, onClick, unreadMessages }) {
    const otherUser = contact.user1.id === currentUser.id ? contact.user2 : contact.user1;
    const unreadCount = unreadMessages[otherUser.id] || 0;

    return (
        <div className="contact" onClick={onClick}>
            <div className="contact-info">
            <div className="contact-avatar-container">
                    {otherUser.avatar ? (
                        <img src={otherUser.avatar} alt={otherUser.username} className="contact-avatar" />
                    ) : (
                        <div className="contact-avatar default-avatar">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    )}
                </div>
                <div className="contact-details">
                    <span className="contact-name">{otherUser.username}</span>
                    <div className="contact-metadata">
                        <span className="contact-last-message">
                            {new Date(contact.modified_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                        </span>
                        {unreadCount > 0 && (
                            <span className="contact-unread">{unreadCount}</span>
                        )}
                        <span className={`contact-status ${otherUser.status_network}`}></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactItem;