import bcrypt from 'bcrypt';
import { generateToken } from 'common/utils/jwtUtils';
import { todoUseCase } from 'domain/todolist/useCase/todoUseCase';
import { defineController } from './$relay';
export default defineController(() => ({
  post: async ({ body }) => {
    const { name, password } = body;

    try {
      const exisiitngUser = await todoUseCase.findUserByName(name);
      if (exisiitngUser) {
        return { status: 400, body: { error: 'User already exists' } };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await todoUseCase.createUser(name, hashedPassword);

      const token = generateToken(newUser.id);

      return { status: 201, body: { token } };
    } catch (error) {
      console.log('Error in user registration:', error);
      return { status: 500, body: { error: 'Failed to register user' } };
    }
  },
}));
