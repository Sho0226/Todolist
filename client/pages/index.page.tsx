import TodoList from 'features/todo/TodoList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    if (!token) {
      router.push('/login');
    } else {
      setUsername(storedUsername);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      {username && (
        <div className={styles.headers}>
          <p>{username}</p>
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <TodoList />
    </div>
  );
};

export default Home;
