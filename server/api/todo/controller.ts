import { todoUseCase } from 'domain/todolist/useCase/todoUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => ({
    status: 200,
    body: await todoUseCase.getTodo(),
  }),
  post: async ({ body }) => ({
    status: 201,
    body: await todoUseCase.createTodo(body.creates),
  }),
  put: async ({ params, body }) => {
    const { id } = params;
    const todo = await todoUseCase.updateTodo(Number(id), body.title);
    if (todo) {
      return { status: 200, body: todo };
    } else {
      return { status: 404, body: { error: 'Todo Not Found' } };
    }
  },
  delete: async ({ params }) => {
    const { id } = params;
    const result = await todoUseCase.deleteTodo(Number(id));
    if (result) {
      return { status: 204 };
    } else {
      return { status: 404, body: { error: 'Todo Not Found' } };
    }
  },
}));
