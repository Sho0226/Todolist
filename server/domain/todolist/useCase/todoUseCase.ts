import type { TodoUser } from '@prisma/client';
import type { Todo } from 'common/types/todo';
import { transaction } from 'service/prismaClient';
import { todoQuery } from '../repository/todoQuery';

export const todoUseCase = {
  getTodo: async (todoUserId: number): Promise<Todo[]> =>
    transaction('RepeatableRead', async (tx) => {
      const Todos = await todoQuery.getAllTodos(tx, todoUserId);
      return Todos;
    }),

  createTodo: async (title: string, notes: string, todoUser: number): Promise<Todo> =>
    transaction('RepeatableRead', async (tx) => {
      const createTodo = await todoQuery.createTodo(tx, title, notes, todoUser);
      console.log(createTodo);
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

  createUser: async (name: string, password: string): Promise<TodoUser> =>
    transaction('RepeatableRead', async (tx) => {
      const create = await todoQuery.createUser(tx, name, password);
      return create;
    }),

  findUserByName: async (name: string): Promise<TodoUser | null> =>
    transaction('RepeatableRead', async (tx) => {
      const findUser = await todoQuery.findUserByName(tx, name);
      return findUser;
    }),
};
