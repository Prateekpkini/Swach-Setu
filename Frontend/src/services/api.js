// API service for communicating with backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class ApiService {
  static async fetchHouseholds() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/households`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching households:', error);
      throw error;
    }
  }

  static async fetchCollectionLogs() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/collection-logs`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching collection logs:', error);
      throw error;
    }
  }

  static async fetchTodayCollections() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/today-collections`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching today\'s collections:', error);
      throw error;
    }
  }

  static async sendChatMessage(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  }
}

export default ApiService;