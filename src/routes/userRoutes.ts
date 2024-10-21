import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';

export const handleUserRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  // Routing for /api/users
  if (url === '/api/users' && method === 'GET') {
    return getAllUsers(res);
  }

  if (url === '/api/users' && method === 'POST') {
    return createUser(req, res);
  }

  // Routing for /api/users/:userId
  const userIdPattern = /^\/api\/users\/([a-zA-Z0-9-]+)$/;
  const match = url?.match(userIdPattern);
  if (match) {
    const userId = match[1];

    if (method === 'GET') {
      return getUserById(res, userId);
    }

    if (method === 'PUT') {
      return updateUser(req, res, userId);
    }

    if (method === 'DELETE') {
      return deleteUser(res, userId);
    }
  }

  // 404 Not Found
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Not found' }));
};
