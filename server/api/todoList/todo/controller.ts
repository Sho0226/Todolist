import { todoUseCase } from 'domain/todolist/useCase/todoUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => {
    try {
      const todos = await todoUseCase.getTodo();
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
  post: async ({ body }) => {
    try {
      const todo = await todoUseCase.createTodo(body.title, body.notes);
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
  put: async ({ body }) => {
    try {
      const todo = await todoUseCase.updateTodo(body.id, body.title, body.notes);
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
  delete: async ({ body }) => {
    try {
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
  putNote: async ({ body }) => {
    try {
      const todo = await todoUseCase.updateTodoNotes(body.id, body.notes);
      if (todo) {
        return { status: 200, body: todo };
      } else {
        return { status: 404, body: { error: 'Todo Not Found' } };
      }
    } catch (error) {
      console.error('Error in updateTodoNotes:', error);
      return {
        status: 500,
        body: { error: 'Failed to update todo notes' },
      };
    }
  },
}));
