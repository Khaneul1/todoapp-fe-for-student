import React from 'react';
import { Col, Row } from 'react-bootstrap';

const TodoItem = ({ item, onUpdateTask, onDeleteTask }) => {
  const handleComplete = () => {
    onUpdateTask(item._id, !item.isComplete);
  };

  const handleDelete = () => {
    onDeleteTask(item._id);
  };
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? 'completed' : ''}`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button className="button-delete" onClick={handleDelete}>
              삭제
            </button>
            <button
              className="button-delete"
              onClick={handleComplete}
              style={{
                backgroundColor: item.isComplete ? 'gray' : '#0d6efd',
                color: 'white',
              }}
            >
              끝남
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
