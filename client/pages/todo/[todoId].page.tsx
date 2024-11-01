import type { Todo } from 'common/types/todo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { apiClient } from 'utils/apiClient';
import styles from './TodoDetail.module.css';

const TodoDetail = () => {
  const router = useRouter();
  const { todoId } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (todoId) {
      fetchTodo();
    }
  }, [todoId]);

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };
  //eslint-disable-next-line complexity
  const fetchTodo = async () => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const allTodos = await apiClient.todoList.todo.$get({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const specificTodo = allTodos.find((todo) => todo.id === Number(todoId));
      if (specificTodo) {
        setTodo(specificTodo);
        setNotes(specificTodo.notes || '');
      } else {
        setError('Todoが見つかりません');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Todoの取得中にエラーが発生しました');
      if (error instanceof Error && error.message.includes('401')) {
        router.push('/login');
      }
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };
  //eslint-disable-next-line complexity
  const saveNotes = async () => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
      return;
    }

    if (todo) {
      try {
        await apiClient.todoList.todo.$put({
          body: {
            id: todo.id,
            title: todo.title,
            notes,
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setError(null);
      } catch (error) {
        console.error('Error saving notes:', error);
        setError('メモの保存中にエラーが発生しました');
        //eslint-disable-next-line max-depth
        if (error instanceof Error && error.message.includes('401')) {
          router.push('/login');
        }
      }
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
      <p className={styles.date}>
        作成日: {new Date(todo.createdAt).toLocaleDateString()}{' '}
        {new Date(todo.createdAt).toLocaleTimeString()}
      </p>
      <p className={styles.date}>
        更新日: {new Date(todo.updatedAt).toLocaleDateString()}{' '}
        {new Date(todo.updatedAt).toLocaleTimeString()}
      </p>
      <textarea className={styles.notes} value={notes} onChange={handleNotesChange} />
      <button onClick={saveNotes}>
        <IoPaperPlaneOutline />
      </button>
    </div>
  );
};

export default TodoDetail;
