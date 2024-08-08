import type { DefineMethods } from 'aspida';
import type { Todo } from 'common/types/todo';

export type Methods = DefineMethods<{
  get: {
    resBody: Todo[];
  };
  post: {
    reqBody: {
      title: string;
    };
    resBody: Todo;
  };
  put: {
    params: {
      id: number;
    };
    reqBody: {
      title: string;
    };
    resBody: Todo | null;
  };
  delete: {
    params: {
      id: number;
    };
    resBody: void;
  };
}>;
