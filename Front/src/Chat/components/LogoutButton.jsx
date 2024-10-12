// components/LogoutButton.jsx
import React from 'react';
import { logout } from '../auth/authService';

const LogoutButton = () => {
	return (
		<button onClick={logout}>
			Logout
		</button>
	);
};

export default LogoutButton;