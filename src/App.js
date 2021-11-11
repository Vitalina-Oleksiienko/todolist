import React, { Component } from "react";
import TodoList from "./components/TodiList/TodoList";

class App extends Component {
  state = {
    todos: [
      { id: "id-1", text: "Выучить основы React", completed: true },
      { id: "id-2", text: "Робота c REST API", completed: false },
      { id: "id-3", text: "Разобраться с React Router", completed: false },
      { id: "id-4", text: "Redux Toolkit", completed: false },
      { id: "id-5", text: "Пережить Redux", completed: false },
      { id: "id-5", text: "JWT(JSON Web Token)", completed: false },
    ],
  };

  deleteTodo = (todoId) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId),
    }));
  };

  render() {
    const { todos } = this.state;

    const totalTodoCount = todos.length;

    const completedTodoCount = todos.reduce(
      (acc, todo) => (todo.completed ? acc + 1 : acc),
      0
    );

    return (
      <>
        <h1>Состояние компонента</h1>
        <div>
          <p>Общее кол-во todo: {totalTodoCount}</p>
          <p>Количество выполненных: {completedTodoCount}</p>
        </div>

        <TodoList todos={todos} onDeleteTodo={this.deleteTodo} />
      </>
    );
  }
}

export default App;
