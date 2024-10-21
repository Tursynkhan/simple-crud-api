import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

let users: User[] = [];

export const db = {
  getAllUsers: () => users,
  getUserById: (id: string) => users.find(user => user.id === id),
  createUser: (username: string, age: number, hobbies: string[]) => {
    const newUser: User = { id: uuidv4(), username, age, hobbies };
    users.push(newUser);
    return newUser;
  },
  updateUser: (id: string, username: string, age: number, hobbies: string[]) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { id, username, age, hobbies };
      return users[userIndex];
    }
    return null;
  },
  deleteUser: (id: string) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return true;
    }
    return false;
  }
};
