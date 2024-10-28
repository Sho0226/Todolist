import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      name: string;
      password: string;
    };
    resBody:
      | {
          token: string;
          username: string;
        }
      | { error: string };
    status: 201 | 400 | 500;
  };
}>;
