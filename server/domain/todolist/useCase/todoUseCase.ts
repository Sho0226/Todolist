import type { Todo } from 'common/types/todo';
import { transaction } from 'service/prismaClient';
import { todoQuery } from '../repository/todoQuery';

export const todoUseCase = {
  getTodo: async (): Promise<Todo[]> =>
    transaction('RepeatableRead', async (tx) => {
      const Todos = await todoQuery.getAllTodos(tx);
      return Todos;
    }),

  createTodo: async (title: string): Promise<Todo> =>
    transaction('RepeatableRead', async (tx) => {
      const create = await todoQuery.createTodo(tx, title);
      return create;
    }),

  updateTodo: async (id: number, title: string): Promise<Todo | null> =>
    transaction('RepeatableRead', async (tx) => {
      const update = await todoQuery.updateTodo(tx, id, title);
      return update;
    }),

  deleteTodo: async (id: number): Promise<boolean> =>
    transaction('RepeatableRead', async (tx) => {
      const deletes = await todoQuery.deleteTodo(tx, id);
      return deletes;
    }),
};
