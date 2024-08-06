import type { DefineMethods } from 'aspida';
import type { Todo } from 'common/types/todo';

export type Methods = DefineMethods<{
  get: {
    query?: {
      gets: boolean;
    };
    resBody: Todo[];
  };
  post: {
    reqBody: {
      title: string;
    };
    resBody: Todo[];
  };
  put: {};
}>;
