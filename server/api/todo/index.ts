import type { DefineMethods } from 'aspida';
import type { Todo } from 'common/types/todo';

export type Methods = DefineMethods<{
  get: {
    resBody: Todo[];
  };
  post: {
    reqBody: {
      title: string;
      description: string;
    };
    resBody: Todo;
  };
  put: {
    reqBody: {
      title: string;
      description: string;
      id: number;
    };
    resBody: Todo | null;
  };
  delete: {
    reqBody: {
      id: number;
    };
    resBody: void;
  };
  description: {
    reqBody: {
      id: number;
      description: string;
    };
    resBody: Todo | null;
  };
}>;
