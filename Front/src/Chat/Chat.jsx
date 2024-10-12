// import LoginPage from './login/LoginPage.jsx'
import ChatPage from './chat/ChatPage.jsx'
// import PrivateRoute from './private/PrivateRoute.jsx'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// chat application

function Chat() {
	return (
		<ChatPage />
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
