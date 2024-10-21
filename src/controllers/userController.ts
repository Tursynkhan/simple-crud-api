import { IncomingMessage, ServerResponse } from 'http';
import { db } from '../db';
import { validateUUID } from '../utils/validateUUID';

export const getAllUsers = (res: ServerResponse) => {
  const users = db.getAllUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const getUserById = (res: ServerResponse, userId: string) => {
  if (!validateUUID(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Invalid UUID' }));
  }

  const user = db.getUserById(userId);
  
  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'User not found' }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
};

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);

      if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Invalid user data. Required fields: username, age, hobbies.' }));
      }

      const newUser = db.createUser(username, age, hobbies);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (error) {
      console.error('Error parsing request body:', error);

      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Invalid JSON format.' }));
    }
  });
};

export const updateUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (!validateUUID(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Invalid UUID' }));
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);
    const updatedUser = db.updateUser(userId, username, age, hobbies);

    if (!updatedUser) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'User not found' }));
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updatedUser));
  });
};

export const deleteUser = (res: ServerResponse, userId: string) => {
  if (!validateUUID(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'Invalid UUID' }));
  }

  const success = db.deleteUser(userId);
  if (!success) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: 'User not found' }));
  }

  res.writeHead(204);
  res.end();
};
