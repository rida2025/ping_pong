// import LoginPage from './login/LoginPage.jsx'
import ChatPage from './chat/ChatPage.jsx'
import { useNotificationWS } from '../contexts/NotifWSContext.jsx'
import { useContext } from 'react'

// import PrivateRoute from './private/PrivateRoute.jsx'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// chat application

function Chat() {
	// const {sendMessage, isConnected} = useNotificationWS();
	return (
		<ChatPage />
		// <div>
		// 	{isConnected ? <ChatPage /> : <div>Not connected</div>}
		// </div>
		// <Router>
		// 	<Routes>
		// 		<Route path="/api/login" element={ <LoginPage /> } />
		// 		<Route
		// 			path="/api/chat"
		// 			element={
		// 				<PrivateRoute>
		// 					<ChatPage />
		// 				</PrivateRoute>
		// 			}
		// 		/>
		// 	</Routes>
		// </Router>
	)
}

export default Chat
