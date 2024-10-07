import type { DefineMethods } from 'aspida';
import type { Todo } from 'common/types/todo';

export type Methods = DefineMethods<{
  get: {
    reqHeaders: {
      'x-todo-user-id': string;
    };
    resBody: Todo[];
  };
  post: {
    reqHeaders: {
      'x-todo-user-id': string;
    };
    reqBody: {
      title: string;
      notes?: string;
    };
    resBody: Todo;
  };
  put: {
    reqHeaders: {
      'x-todo-user-id': string;
    };
    reqBody: {
      title: string;
      id: number;
      notes?: string;
    };
    resBody: Todo | null;
  };
  delete: {
    reqHeaders: {
      'x-todo-user-id': string;
    };
    reqBody: {
      id: number;
    };
    resBody: void;
  };
}>;
