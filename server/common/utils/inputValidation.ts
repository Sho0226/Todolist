export function validateLoginInput(name: string, password: string): string | null {
  if (!name || name.trim().length === 0) {
    return 'ユーザー名を入力してください。';
  }
  if (!password || password.length < 6) {
    return 'パスワードは6文字以上で入力してください。';
  }
  return null;
}
