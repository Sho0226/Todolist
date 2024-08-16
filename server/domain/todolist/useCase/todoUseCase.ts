import type { Todo } from 'common/types/todo';
import { transaction } from 'service/prismaClient';
import { todoQuery } from '../repository/todoQuery';

export const todoUseCase = {
  getTodo: async (): Promise<Todo[]> =>
    transaction('RepeatableRead', async (tx) => {
      const Todos = await todoQuery.getAllTodos(tx);
      return Todos;
    }),

  createTodo: async (title: string, notes: string): Promise<Todo> =>
    transaction('RepeatableRead', async (tx) => {
      const createTodo = await todoQuery.createTodo(tx, title, notes);
      return createTodo;
    }),

  updateTodo: async (id: number, title: string, notes: string): Promise<Todo | null> =>
    transaction('RepeatableRead', async (tx) => {
      const updateTodo = await todoQuery.updateTodo(tx, id, title, notes);
      console.log('useCase', updateTodo?.title);
      return updateTodo;
    }),

  deleteTodo: async (id: number): Promise<boolean> =>
    transaction('RepeatableRead', async (tx) => {
      const deleted = await todoQuery.deleteTodo(tx, id);
      return deleted;
    }),
};
