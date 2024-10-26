import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './Login.module.css';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  //eslint-disable-next-line complexity
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name || !password) {
      setError('名前とパスワードを入力してください。');
      return;
    }

    try {
      const response = await apiClient.auth.$post({
        body: { name, password },
      });

      if ('token' in response) {
        localStorage.setItem('authToken', response.token);
        router.push('/');
      } else {
        setError('ログインに失敗しました。');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('ログインに失敗しました。再度お試しください。');
    }
  };

  const goToSignup = () => {
    router.push('/signup');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      <p className={styles.signupLink}>
        New here?{' '}
        <span onClick={goToSignup} className={styles.link}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
