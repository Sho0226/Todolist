import type { Prisma } from '@prisma/client';
import type { Todo } from 'common/types/todo';

const getAllTodos = async (tx: Prisma.TransactionClient): Promise<Todo[]> => {
  return await tx.todo.findMany();
};

const createTodo = async (tx: Prisma.TransactionClient, title: string): Promise<Todo> => {
  return await tx.todo.create({
    data: {
      title,
      createdAt: new Date(),
      updateAt: new Date(),
    },
  });
};

const updateTodo = async (
  tx: Prisma.TransactionClient,
  id: number,
  title: string,
): Promise<Todo | null> => {
  return await tx.todo.update({
    where: { id },
    data: {
      title,
      updateAt: new Date(),
    },
  });
};

const deleteTodo = async (tx: Prisma.TransactionClient, id: number): Promise<boolean> => {
  const result = await tx.todo.deleteMany({
    where: { id },
  });
  return result.count > 0;
};

export const todoQuery = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
