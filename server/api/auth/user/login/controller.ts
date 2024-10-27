import bcrypt from 'bcrypt';
import { validateLoginInput } from 'common/utils/inputValidation';
import { generateToken } from 'common/utils/jwtUtils';
import logger from 'common/utils/logger';
import { todoUseCase } from 'domain/todolist/useCase/todoUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  //eslint-disable-next-line complexity
  post: async ({ body }) => {
    try {
      const { name, password } = body;

      // 入力バリデーション
      const validationError = validateLoginInput(name, password);
      if (validationError) {
        return { status: 400, body: { error: validationError } };
      }

      const user = await todoUseCase.findUserByName(name);
      logger.info(`Searching for user: "${name}"`);

      if (!user) {
        logger.info(`ログイン失敗: ユーザー "${name}" が見つかりません`);
        return { status: 401, body: { error: 'ユーザー名またはパスワードが正しくありません' } };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        logger.info(`ログイン失敗: ユーザー "${name}" のパスワードが一致しません`);
        return { status: 401, body: { error: 'ユーザー名またはパスワードが正しくありません' } };
      }

      const token = generateToken(user.id);

      logger.info(`ログイン成功: ユーザー "${name}"`);

      return {
        status: 200,
        body: { token },
      };
    } catch (error) {
      logger.error('ログイン処理中にエラーが発生しました:', error);
      return {
        status: 500,
        body: { error: 'ログインに失敗しました。しばらくしてから再度お試しください。' },
      };
    }
  },
}));
