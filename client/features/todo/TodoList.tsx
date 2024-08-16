import type { Todo } from 'common/types/todo';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { pagesPath } from 'utils/$path';
import { apiClient } from 'utils/apiClient';
import styles from './TodoList.module.css';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null); // 警告メッセージの状態を追加
  const router = useRouter();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await apiClient.todoList.todo.$get();
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
        await apiClient.todoList.todo.$put({ body: { title, id: editId, notes: '' } });
      } else {
        await apiClient.todoList.todo.$post({ body: { title, notes: '' } });
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
      await apiClient.todoList.todo.$delete({ body: { id } });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleTitleClick = (id: number) => {
    router.push(pagesPath.todo._todoId(id).$url());
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
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
            <span className={styles.link} onClick={() => handleTitleClick(todo.id)}>
              {todo.title}
            </span>
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
