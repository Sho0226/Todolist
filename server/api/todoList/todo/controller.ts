import { todoUseCase } from 'domain/todolist/useCase/todoUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ headers }) => {
    try {
      const todoUserId = parseInt(headers['x-todo-user-id'] as string, 10);
      if (isNaN(todoUserId)) {
        return { status: 400, body: { error: 'Invalid user ID' } };
      }

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
    console.log('post', body);
    try {
      const todoUserId = parseInt(headers['x-todo-user-id'] as string, 10);
      if (isNaN(todoUserId)) {
        return { status: 400, body: { error: 'Invalid user ID' } };
      }
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
  put: async ({ body, headers }) => {
    console.log('put', body);
    try {
      const todoUserId = parseInt(headers['x-todo-user-id'] as string, 10);
      if (isNaN(todoUserId)) {
        return { status: 400, body: { error: 'Invalid user ID' } };
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
      const todoUserId = parseInt(headers['x-todo-user-id'] as string, 10);
      if (isNaN(todoUserId)) {
        return { status: 400, body: { error: 'Invalid user ID' } };
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
