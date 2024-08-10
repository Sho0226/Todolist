import { todoUseCase } from 'domain/todolist/useCase/todoUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await todoUseCase.getTodo(),
  }),
  post: async ({ body }) => ({
    status: 201,
    body: await todoUseCase.createTodo(body.title),
  }),
  put: async ({ body }) => {
    const todo = await todoUseCase.updateTodo(body.id, body.title);
    if (todo) {
      return { status: 200, body: todo };
    } else {
      return { status: 404, body: { error: 'Todo Not Found' } };
    }
  },
  delete: async ({ body }) => {
    const result = await todoUseCase.deleteTodo(body.id);
    if (result) {
      return { status: 204, body: undefined };
    } else {
      return { status: 404, body: { error: 'Todo Not Found' } };
    }
  },
}));
