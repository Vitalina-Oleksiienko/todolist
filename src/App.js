// import React, { Component } from "react";
// import TodoList from "./components/TodiList/TodoList";

// class App extends Component {
//   state = {
//     todos: [
//       { id: "id-1", text: "Выучить основы React", completed: true },
//       { id: "id-2", text: "Робота c REST API", completed: false },
//       { id: "id-3", text: "Разобраться с React Router", completed: false },
//       { id: "id-4", text: "Пережить Redux", completed: false },
//       { id: "id-5", text: "Redux Toolkit", completed: false },
//       { id: "id-6", text: "JWT(JSON Web Token)", completed: false },
//     ],
//   };

import React, { Component } from "react";
import shortid from "shortid";
// import ColorPicker from './components/ColorPicker';
// import Counter from './components/Counter';
import Container from "./components/Container";
import TodoList from "./components/TodiList/TodoList";
import TodoEditor from "./components/TodoEditor/TodoEditor";
import Filter from "./components/Filter";
// import Form from './components/Form';
import initialTodos from "./todos.json";

class App extends Component {
  state = {
    todos: initialTodos,
    filter: "",
  };

  addTodo = (text) => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = (todoId) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== todoId),
    }));
  };

  toggleCompleted = (todoId) => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter((todo) =>
      todo.text.toLowerCase().includes(normalizedFilter)
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0
    );
  };

  render() {
    const { todos, filter } = this.state;
    const totalTodoCount = todos.length;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();

    return (
      <Container>
        {/* TODO: вынести в отдельный компонент */}

        <div>
          <p>Всего заметок: {totalTodoCount}</p>
          <p>Выполнено: {completedTodoCount}</p>
        </div>

        <TodoEditor onSubmit={this.addTodo} />

        <Filter value={filter} onChange={this.changeFilter} />

        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
      </Container>
    );
  }
}

export default App;
