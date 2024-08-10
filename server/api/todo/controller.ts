import { todoUseCase } from 'domain/todolist/useCase/todoUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({
    status: 200,
    body: await todoUseCase.getTodo(),
  }),
  //bodyがおかしい
  //関数の引数がanyなのもおかしい
  post: async ({ body }: { body: { title: string } }) => ({
    status: 201,
    body: await todoUseCase.createTodo(body.title),
  }),
  put: async ({ params, body }: { params: { id: number }; body: { title: string } }) => {
    const { id } = params;
    const todo = await todoUseCase.updateTodo(Number(id), body.title);
    if (todo) {
      return { status: 200, body: todo };
    } else {
      return { status: 404, body: { error: 'Todo Not Found' } };
    }
  },
  delete: async ({ params }: { params: { id: number } }) => {
    const { id } = params;
    const result = await todoUseCase.deleteTodo(Number(id));
    if (result) {
      return { status: 204 };
    } else {
      return { status: 404, body: { error: 'Todo Not Found' } };
    }
  },
}));
