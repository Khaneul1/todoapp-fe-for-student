import React from 'react';
import TodoItem from './TodoItem';

const TodoBoard = ({ todoList, onUpdateTask, onDeleteTask }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {/* todolist의 길이가 0 이상이면 todoitem 보여 주고 0 이상이 아니면 (아무것도 없으면) h2 문자열 출력 */}
      {todoList.length > 0 ? (
        todoList.map((item) => (
          <TodoItem
            key={item._id}
            item={item}
            onUpdateTask={onUpdateTask}
            onDeleteTask={onDeleteTask}
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
      {/* <TodoItem/> will be here once we get the todoList */}
    </div>
  );
};

export default TodoBoard;
