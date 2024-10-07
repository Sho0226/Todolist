import { useRouter } from 'next/router';
import { useState } from 'react';

import { apiClient } from 'utils/apiClient';
import styles from './Login.module.css';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // APIリクエストを送信する際に、1つのオブジェクトを渡す
      const response = await apiClient.auth.$post({
        body: {
          name,
          password,
        },
      });
      const { token } = response;
      localStorage.setItem('authToken', token);
      router.push('/'); // ログイン成功後、ホームページにリダイレクト
    } catch (err) {
      console.error('Login failed:', err);
      setError('ログインに失敗しました。再度お試しください。');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleLogin} className={styles.button}>
        Login
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Login;
