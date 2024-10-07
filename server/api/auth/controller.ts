import bcrypt from 'bcrypt';
import { generateToken } from 'common/utils/jwtUtils';
import { todoUseCase } from 'domain/todolist/useCase/todoUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    try {
      const { name, password } = body;
      const user = await todoUseCase.findUserByName(name);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return { status: 401, body: { error: 'Invalid credentials' } };
      }

      const token = generateToken(user.id);

      return {
        status: 200,
        body: { token },
      };
    } catch (error) {
      console.error('Error in login:', error);
      return {
        status: 500,
        body: { error: 'Failed to log in' },
      };
    }
  },
}));
