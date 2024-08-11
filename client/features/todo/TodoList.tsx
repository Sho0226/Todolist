import type { Todo } from 'common/types/todo';
import React, { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await apiClient.todo.$get();
      setTodos(response);
      setError(null);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to fetch todos. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId !== null) {
        await apiClient.todo.$put({ body: { title, id: editId } });
      } else {
        await apiClient.todo.$post({ body: { title } });
      }
      setTitle('');
      setEditId(null);
      fetchTodos();
    } catch (error) {
      console.error('Error submitting todo:', error);
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
    <div>
      <h1>Todo List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
        />
        <button type="submit">{editId !== null ? 'Update Todo' : 'Add Todo'}</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleEdit(todo.id, todo.title)}>Edit</button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
