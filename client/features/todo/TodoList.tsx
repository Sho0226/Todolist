import type { Todo } from 'common/types/todo';
import React, { useEffect, useState } from 'react';
import { apiClient } from 'utils/apiClient';

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await apiClient.todo.$get();
    setTodos(response);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId !== null) {
      await apiClient.todo.editId.$put({ body: { title, id: editId } });
    } else {
      await apiClient.todo.$post({ body: { title } });
    }
    setTitle('');
    setEditId(null);
    fetchTodos();
  };

  const handleEdit = (id: number, currentTitle: string) => {
    setEditId(id);
    setTitle(currentTitle);
  };

  const handleDelete = async (id: number) => {
    await apiClient.todo.id.$delete();
    fetchTodos();
  };

  return (
    <div>
      <h1>Todo List</h1>
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
