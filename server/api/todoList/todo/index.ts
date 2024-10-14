import type { DefineMethods } from 'aspida';
import type { Todo } from 'common/types/todo';

export type Methods = DefineMethods<{
  get: {
    reqHeaders: {
      authorization: string;
    };
    resBody: Todo[];
  };
  post: {
    reqHeaders: {
      authorization: string;
    };
    reqBody: {
      title: string;
      notes?: string;
    };
    resBody: Todo;
  };
  put: {
    reqHeaders: {
      authorization: string;
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
      authorization: string;
    };
    reqBody: {
      id: number;
    };
    resBody: void;
  };
}>;
