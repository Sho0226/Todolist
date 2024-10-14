import { verifyToken } from 'common/utils/jwtUtils';
import { todoUseCase } from 'domain/todolist/useCase/todoUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ headers }) => {
    try {
      const token = headers.authorization?.split(' ')[1];
      if (!token) {
        return { status: 401, body: { error: '認証トークンがありません' } };
      }
      const payload = verifyToken(token);
      if (!payload) {
        return { status: 401, body: { error: '無効なトークンです' } };
      }
      const todoUserId = payload.userId;
      const todos = await todoUseCase.getTodo(todoUserId);
      return {
        status: 200,
        body: todos,
      };
    } catch (error) {
      console.error('Error in getTodos:', error);
      return {
        status: 500,
        body: { error: 'Failed to fetch todos' },
      };
    }
  },
  post: async ({ body, headers }) => {
    try {
      const token = headers.authorization?.split(' ')[1];
      if (!token) {
        return { status: 401, body: { error: '認証トークンがありません' } };
      }

      const payload = verifyToken(token);
      if (!payload) {
        return { status: 401, body: { error: '無効なトークンです' } };
      }

      const todoUserId = payload.userId;
      const todo = await todoUseCase.createTodo(body.title, body.notes ?? '', todoUserId);
      return {
        status: 201,
        body: todo,
      };
    } catch (error) {
      console.error('Error in createTodo:', error);
      return {
        status: 500,
        body: { error: 'Failed to create todo' },
      };
    }
  },
  // eslint-disable-next-line complexity
  put: async ({ body, headers }) => {
    try {
      const token = headers.authorization?.split(' ')[1];
      if (!token) {
        return { status: 401, body: { error: '認証トークンがありません' } };
      }

      const payload = verifyToken(token);
      if (!payload) {
        return { status: 401, body: { error: '無効なトークンです' } };
      }

      const todo = await todoUseCase.updateTodo(body.id, body.title, body.notes ?? '');
      if (todo) {
        return { status: 200, body: todo };
      } else {
        return { status: 404, body: { error: 'Todo Not Found' } };
      }
    } catch (error) {
      console.error('Error in updateTodo:', error);
      return {
        status: 500,
        body: { error: 'Failed to update todo' },
      };
    }
  },
  delete: async ({ body, headers }) => {
    try {
      const token = headers.authorization?.split(' ')[1];
      if (!token) {
        return { status: 401, body: { error: '認証トークンがありません' } };
      }

      const payload = verifyToken(token);
      if (!payload) {
        return { status: 401, body: { error: '無効なトークンです' } };
      }
      const result = await todoUseCase.deleteTodo(body.id);
      if (result) {
        return { status: 204, body: undefined };
      } else {
        return { status: 404, body: { error: 'Todo Not Found' } };
      }
    } catch (error) {
      console.error('Error in deleteTodo:', error);
      return {
        status: 500,
        body: { error: 'Failed to delete todo' },
      };
    }
  },
}));
