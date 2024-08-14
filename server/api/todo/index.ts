import type { DefineMethods } from 'aspida';
import type { Todo } from 'common/types/todo';

export type Methods = DefineMethods<{
  get: {
    resBody: Todo[];
  };
  post: {
    reqBody: {
      title: string;
      notes: string;
    };
    resBody: Todo;
  };
  put: {
    reqBody: {
      title: string;
      id: number;
      notes: string;
    };
    resBody: Todo | null;
  };
  delete: {
    reqBody: {
      id: number;
    };
    resBody: void;
  };
}>;
