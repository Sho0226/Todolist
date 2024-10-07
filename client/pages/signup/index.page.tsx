import { useRouter } from 'next/router';
import { useState } from 'react';

import { apiClient } from 'utils/apiClient';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const response = await apiClient.auth.user.$post({
        body: {
          name,
          password,
        },
      });
      const { token } = response;
      localStorage.setItem('authToken', token);
      router.push('/');
    } catch (err) {
      console.error('Signup failed:', err);
      setError('サインアップに失敗しました。再度お試しください。');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
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
      <button onClick={handleSignUp} className={styles.button}>
        Sign Up
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default SignUp;
