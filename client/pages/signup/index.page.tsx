import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
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
      const response = await apiClient.auth.user.$post({
        body: {
          name,
          password,
        },
      });

      if ('token' in response) {
        localStorage.setItem('authToken', response.token);
        router.push('/');
      } else {
        setError(response.error || 'サインアップに失敗しました。');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      setError('サインアップに失敗しました。再度お試しください。');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Name (3文字以上)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
          minLength={3}
        />
        <input
          type="password"
          placeholder="Password (6文字以上)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
          minLength={6}
        />
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SignUp;
