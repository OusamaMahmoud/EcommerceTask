import { create } from "zustand";

type User = {
  id: number;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  address?: string;
};

type UserState = {
  users: User[];
  addUser: (user: User) => void;
  resetUsers: () => void;
  initializeUsers: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  users: JSON.parse(localStorage.getItem("users") || "[]"), // Initialize from localStorage
  addUser: (user) =>
    set((state) => {
      const updatedUsers = [...state.users, user];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to localStorage
      return { users: updatedUsers };
    }),
  resetUsers: () => {
    localStorage.removeItem("users"); // Clear localStorage
    set(() => ({ users: [] }));
  },
  initializeUsers: () => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    set(() => ({ users: storedUsers }));
  },
}));
