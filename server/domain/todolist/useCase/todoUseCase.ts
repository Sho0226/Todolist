import type { Todo } from 'common/types/todo';
import { transaction } from 'service/prismaClient';
import { todoQuery } from '../repository/todoQuery';

export const todoUseCase = {
  getTodo: async (): Promise<Todo[]> =>
    transaction('RepeatableRead', async (tx) => {
      const Todos = await todoQuery.getAllTodos(tx);
      return Todos;
    }),

  createTodo: async (title: string, description: string): Promise<Todo> =>
    transaction('RepeatableRead', async (tx) => {
      const createTodo = await todoQuery.createTodo(tx, title, description);
      return createTodo;
    }),

  updateTodo: async (id: number, title: string, description: string): Promise<Todo | null> =>
    transaction('RepeatableRead', async (tx) => {
      const updateTodo = await todoQuery.updateTodo(tx, id, title, description);
      return updateTodo;
    }),

  deleteTodo: async (id: number): Promise<boolean> =>
    transaction('RepeatableRead', async (tx) => {
      const deleted = await todoQuery.deleteTodo(tx, id);
      return deleted;
    }),

  descriptionTodo: async (id: number, description: string, updatedAt: Date): Promise<Todo | null> =>
    transaction('RepeatableRead', async (tx) => {
      const descriptionTodo = await todoQuery.descriptionTodo(tx, id, description, updatedAt);
      return descriptionTodo;
    }),
};
