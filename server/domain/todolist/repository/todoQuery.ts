import { Prisma, type Todo } from '@prisma/client';


const getAllTodos = async (tx: Prisma.TransactionClient): Promise<Todo[]> => {
  return await tx.todo.findMany()
};

const createTodo =

const updateTodo =
