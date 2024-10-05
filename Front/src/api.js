import axios from 'axios';

const fetchUserData = async (userId) => {
  try {
    const response = await axios.get(`http://your-backend-url/api/users/${userId}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
