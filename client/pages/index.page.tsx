import TodoList from 'features/todo/TodoList';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './index.module.css';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    }
  }, [router]);
  return (
    <div className={styles.container}>
      <TodoList />
    </div>
  );
};

export default Home;
