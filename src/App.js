import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoBoard from './components/TodoBoard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import api from './utils/api';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const getTasks = async () => {
    const response = await api.get('/tasks');
    console.log('rrr', response);
    setTodoList(response.data.data);
  };

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 200) {
        console.log('success');
        // 1. 입력한 값 안 사라짐
        // >> 초기화 안 해 줘서 그래여 ㅎ
        setTodoValue('');
        // 2. 추가한 값 안 보임 (근데 새로고침 하니까 보이긴 햇음)
        getTasks();
      } else {
        throw new Error('task can not be added');
      }
    } catch (err) {
      console.log('error', err);
    }
  };

  const updateTaskStatus = async (id, isComplete) => {
    try {
      const response = await api.put(`/tasks/${id}`, { isComplete });
      if (response.status === 200) {
        getTasks();
        console.log('isComplete status 성공!!!!');
      }
    } catch (err) {
      console.error('Update error: ', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
        console.log('삭제 성공~~~~');
      }
    } catch (err) {
      console.error('Delete error: ', err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        onUpdateTask={updateTaskStatus}
        onDeleteTask={deleteTask}
      />
    </Container>
  );
}

export default App;
