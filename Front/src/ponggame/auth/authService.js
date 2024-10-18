import api from './api';

const login = async (username, password) => {
    const response = await api.post('/login/', { username, password });
    if (response.status === 200) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
};

const logout = async () => {
    try {
        await api.post('/logout/', {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/api/login';
    } catch (error) {
        if (error.response && error.response.status === 401) {
            try {
                const refreshResponse = await api.post('/refresh/', {
                    refresh: localStorage.getItem('refresh_token')
                });
                if (refreshResponse.status === 200) {
                    localStorage.setItem('access_token', refreshResponse.data.access);
                    await api.post('/logout/', {}, {
                        headers: {
                            'Authorization': `Bearer ${refreshResponse.data.access}`
                        }
                    });
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/api/login';
                }
            } catch (refreshError) {
                console.error('Token refresh failed', refreshError);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/api/login';
            }
        } else {
            console.error('Logout failed', error);
        }
    }
};

export { login, logout };