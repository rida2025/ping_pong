import React from 'react';

function MessageItem({ message, currentUser }) {
    const isCurrentUser = message.sender.username === currentUser.username;

    return (
        <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
            <div className="message-content">
                <span className="message-text">{message.content}</span>
                <span className="message-time">
                    {new Date(message.created_at).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    })}
                </span>
            </div>
        </div>
    );
}

export default MessageItem;