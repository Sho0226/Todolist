import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      name: string;
      password: string;
    };
    resBody: string;
  };
}>;
