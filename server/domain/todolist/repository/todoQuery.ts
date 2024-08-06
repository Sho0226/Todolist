import { Prisma, type Todo } from '@prisma/client';
import { number, string } from 'zod';


const getAllTodos = async (tx: Prisma.TransactionClient): Promise<Todo[]> => {
  return await tx.todo.findMany()
};

const createTodo = async (
  tx: Prisma.TransactionClient,
  title: string,
): Promise<Todo > => {
  return await tx.todo.create({
    data: {
      title,
      createdAt: new Date(),
      updateAt: new Date()
    },
  });
};

const updateTodo =
