import bcrypt from 'bcrypt';
import { generateToken } from 'common/utils/jwtUtils';
import { todoUseCase } from 'domain/todolist/useCase/todoUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  //eslint-disable-next-line complexity
  post: async ({ body }) => {
    const { name, password } = body;

    if (!name || !password) {
      return { status: 400, body: { error: 'Name and password are required' } };
    }

    if (typeof name !== 'string' || typeof password !== 'string') {
      return { status: 400, body: { error: 'Invalid input types' } };
    }

    if (name.length < 3 || password.length < 6) {
      return {
        status: 400,
        body: {
          error: 'Name must be at least 3 characters and password at least 6 characters long',
        },
      };
    }

    try {
      const existingUser = await todoUseCase.findUserByName(name);
      if (existingUser) {
        return { status: 400, body: { error: 'User already exists' } };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await todoUseCase.createUser(name, hashedPassword);

      const token = generateToken(newUser.id);

      return { status: 201, body: { token, username: name } };
    } catch (error) {
      console.error('Error in user registration:', error);
      return { status: 500, body: { error: 'Failed to register user' } };
    }
  },
}));
