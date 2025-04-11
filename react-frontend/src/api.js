import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
    ? '/api'
    : 'http://192.168.203.207:5000/api';

export const getEstimate = async (area, storeys, bhkSize) => {
    try {
        const response = await axios.post(`${API_URL}/estimate`, {
            area: area,
            storeys: storeys,
            bhkSize: bhkSize
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: 'Failed to get estimate' };
    }
};
