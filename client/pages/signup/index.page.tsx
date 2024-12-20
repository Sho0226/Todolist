import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  //eslint-disable-next-line complexity
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (name.length < 3) {
      setError('名前は3文字以上で入力してください。');
      return;
    }

    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください。');
      return;
    }

    try {
      const response = await apiClient.auth.user.signup.$post({
        body: {
          name,
          password,
        },
      });

      if ('token' in response) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('username', response.username);
        router.push('/');
      }
    } catch (err) {
      // エラー処理
      if (axios.isAxiosError(err)) {
        //eslint-disable-next-line max-depth
        if (
          err.response &&
          err.response.data &&
          err.response.data.error === 'User already exists'
        ) {
          setError('この名前はすでに使用されています。別の名前を選択してください。');
        } else {
          console.log(err.response && err.response.data);
          setError('サインアップに失敗しました。再度お試しください。');
        }
      } else {
        setError('サインアップに失敗しました。');
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>

      <form onSubmit={handleSignUp}>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Name (3文字以上)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
            minLength={3}
          />
          <div className={styles.passwordContainer}>
            <input
              type="password"
              placeholder="Password (6文字以上)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              minLength={6}
            />
            <span onClick={() => setIsRevealPassword((prev) => !prev)} className={styles.eyeIcon}>
              {isRevealPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <button type="submit" className={styles.button}>
            Sign Up
          </button>
        </div>
      </form>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SignUp;
