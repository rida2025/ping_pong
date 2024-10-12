import React, { useState, useEffect } from 'react';
import ContactItem from './ContactItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Sidebar({ setupChatRoom, setupSocket, data, allUsers, unreadMessages }) {
	const [search, setSearch] = useState('');
	const [matchedUsers, setMatchedUsers] = useState([]);
	const [sortedRooms, setSortedRooms] = useState([]);
	const [showResults, setShowResults] = useState(false);

	useEffect(() => {
		const performSearch = async () => {
			try {
				const socket = await setupSocket(1);
				socket.send(JSON.stringify({
					type: 'SEARCH_USERS',
					query: search,
				}));
			} catch (error) {
				console.error('Error fetching matched users:', error);
			}
		}
		if (search.length == 2) {
			performSearch();
			setShowResults(true);
		}

		const filteredUsers = allUsers.filter(user => 
			user.username.toLowerCase().includes(search.toLowerCase())
		);
		setMatchedUsers(filteredUsers.slice(0, 5));
		console.log('matchedUsers: ', matchedUsers)
	}, [search]);

	useEffect(() => {
		setMatchedUsers(allUsers.filter(user => 
			user.username.toLowerCase().includes(search.toLowerCase())
		).slice(0, 5));
	}, [allUsers]);

	useEffect(() => {
		data.chat_rooms.forEach(room => {
			setupSocket(room.id);
		})
		const filteredAndSortedRooms = data.chat_rooms
			.filter(room => room.messages && room.messages.length > 0)
			.sort((a, b) => new Date(b.modified_at) - new Date(a.modified_at));
		setSortedRooms(filteredAndSortedRooms);
	}, [data.chat_rooms]);

	const sendSelectUserRequest = async (username) => {
        try {
            const socket = await setupSocket(1);
            socket.send(JSON.stringify({
                type: 'SELECT_USER',
                username: username,
            }));
        } catch (error) {
            console.error('Error sending SELECT_USER request:', error);
        }
    }

	const handleSearch = (e) => {
		setSearch(e.target.value);
		setShowResults(e.target.value.length > 1);
	}

	const handleSubmitSearch = async (e) => {
        e.preventDefault();
		if (search.length >= 2) {
            await sendSelectUserRequest(search);
            setShowResults(false);
        }
    }

	const handleSelectUser = async (user) => {
        await sendSelectUserRequest(user.username);
        setShowResults(false);
    }

    return (
        <div className="sidebar">
            <form className="search-container" onSubmit={handleSubmitSearch}>
                <input 
                    type="text" 
                    className="search" 
                    placeholder="Search contacts" 
                    value={search}
                    onChange={handleSearch}
					maxLength={50}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
				{showResults && (
                    <div className="search-results">
                        {matchedUsers.map((user, index) => (
                            <div key={index} className="search-result-item" onClick={() => handleSelectUser(user)}>
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.username} className="search-result-avatar" />
                                ) : (
                                    <div className="search-result-avatar default-avatar">
                                        <FontAwesomeIcon icon={faUser} />
                                    </div>
                                )}
                                <span className="search-result-username">{user.username}</span>
                            </div>
                        ))}
                    </div>
                )}
            </form>
            <div className="contact-list">
                {sortedRooms.map((contact, index) => (
                    <ContactItem
                        key={index}
                        contact={contact}
                        currentUser={data.user}
                        onClick={() => {
                            setupChatRoom(contact);
                            setupSocket(contact.id);
                        }}
						unreadMessages={unreadMessages}
                    />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;