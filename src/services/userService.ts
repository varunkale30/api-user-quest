import type { User, ApiError } from "@/types/user";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export class UserService {
  static async fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const users: User[] = await response.json();
      
      // Validate the response structure
      if (!Array.isArray(users)) {
        throw new Error('Invalid response format: expected an array of users');
      }

      return users;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        // Network error
        throw new Error('Network error: Please check your internet connection and try again.');
      }
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('An unexpected error occurred while fetching users.');
    }
  }

  static async fetchUserById(id: number): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const user: User = await response.json();
      return user;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please check your internet connection and try again.');
      }
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error(`An unexpected error occurred while fetching user ${id}.`);
    }
  }
}