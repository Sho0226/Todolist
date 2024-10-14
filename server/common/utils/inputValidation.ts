export function validateLoginInput(name: string, password: string): string | null {
  if (!name || name.trim().length === 0) {
    return 'ユーザー名を入力してください。';
  }
  if (!password || password.length < 8) {
    return 'パスワードは8文字以上で入力してください。';
  }
  return null;
}
