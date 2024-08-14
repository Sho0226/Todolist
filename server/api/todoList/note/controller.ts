import { todoUseCase } from 'domain/todolist/useCase/todoUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ body }) => {
    try {
      const desc = await todoUseCase.notesTodo(body.id, body.notes);
      return {
        status: 202,
        body: desc,
      };
    } catch (error) {
      console.error('Error in descriptionTodo:', error);
      return {
        status: 500,
        body: { error: 'Failed to description Todo' },
      };
    }
  },
}));
