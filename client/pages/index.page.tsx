import TodoList from 'features/todo/TodoList';
import styles from './index.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <TodoList />
    </div>
  );
};

export default Home;
