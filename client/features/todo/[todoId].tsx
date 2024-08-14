import type { Todo } from 'common/types/todo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './TodoDetail.module.css';

const TodoDetail = () => {
  const router = useRouter();
  const { todoId } = router.query; // URLからtodoIdを取得
  const [todo, setTodo] = useState<Todo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (todoId) {
      fetchTodo();
    }
  }, [todoId]);

  const fetchTodo = async () => {
    try {
      const res = await apiClient.todo(Number(todoId)).$get();
      setTodo(res);
    } catch (error) {
      console.error('Error fetching todo:', error);
      setError('Todoの取得中にエラーが発生しました');
    }
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!todo) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{todo.title}</h1>
      <p>{todo.description}</p>
      {/* 必要に応じて詳細情報を追加 */}
    </div>
  );
};

export default TodoDetail;
