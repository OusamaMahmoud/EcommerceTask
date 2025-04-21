export const MOCK_API_URL = "https://6803c08a79cb28fb3f5992e9.mockapi.io/api";
export const generateToken = (username: string) => {
    return `${username}_${Math.random().toString(36).substring(2)}_${Date.now()}`;
  };