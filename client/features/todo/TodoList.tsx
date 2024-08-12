import type { Todo } from 'common/types/todo';
import React, { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';
import styles from './TodoList.module.css';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null); // 警告メッセージの状態を追加

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await apiClient.todo.$get();
    setTodos(res);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      setError('タイトルを入力してください');
      return;
    }

    try {
      if (editId !== null) {
        await apiClient.todo.$put({ body: { title, id: editId } });
      } else {
        await apiClient.todo.$post({ body: { title } });
      }
      setTitle('');
      setEditId(null);
      fetchTodos();
      setError(null); // 成功時にエラーメッセージをクリア
    } catch (error) {
      console.error('Error submitting todo:', error);
      setError('Todoの送信中にエラーが発生しました'); // 失敗時にエラーメッセージを設定
    }
  };

  const handleEdit = (id: number, currentTitle: string) => {
    setEditId(id);
    setTitle(currentTitle);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.todo.$delete({ body: { id } });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>{' '}
      <div className={`${styles.error} ${!error ? styles.hidden : ''}`}>{error}</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {editId !== null ? 'Update Todo' : 'Add Todo'}
        </button>
      </form>
      <div className={styles.box}>
        {todos.map((todo) => (
          <div key={todo.id} className={styles.todo}>
            <span>{todo.title}</span>
            <button onClick={() => handleEdit(todo.id, todo.title)} className={styles.button}>
              Edit
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className={`${styles.button} ${editId === todo.id ? styles.disabledButton : ''}`}
              disabled={editId === todo.id}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
