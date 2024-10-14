import TodoList from 'features/todo/TodoList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    } else {
      // ユーザー名を取得する処理（APIコールなど）を追加
      setUsername('User'); // 仮のユーザー名
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      {username && (
        <div className={styles.headers}>
          <p>Welcome, {username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <TodoList />
    </div>
  );
};

export default Home;
