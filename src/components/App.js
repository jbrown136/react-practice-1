import React from 'react';

//let todos = ['learn react', 'go climbing', 'sleep']

class App extends React.Component {
  state = {
    todos: [
      {
        task: 'learn react',
        completed: false,
        repeat: false
      },
      {
        task: 'go climbing',
        completed: false,
        repeat: false
      }, {
        task: 'sleep',
        completed: false,
        repeat: false
      }
    ]
  }
  render () {
    return (
      <div>
          <Heading />
          <TodoAdder addTodo={this.addTodo}/>
          <List 
          todos={this.state.todos}
          strikeTodo={this.strikeTodo}
          repeatTodo={this.repeatTodo}
          />
      </div>
    );
  }

  strikeTodo = (todoToStrike) => { //arrow function allows this to refer to class object
    // this.setState(({todos}) => {
    //   return {
    //     todos: todos.filter(todo => {
    //       return todo !== todoToStrike;
    //     })
    //   }
    // })
    this.setState({
      todos: this.state.todos.map(todo => {
              if (todo.task === todoToStrike) todo.completed = true;
              return todo;
              //return {...todo, completed: !todo.completed} inside if statement to avoid mutation
            })
          })
        }

  repeatTodo = (todoToRepeat) => {
    todoToRepeat.repeat = true
    this.setState({
      todos: [...this.state.todos.filter(todo => {
        return todo.task !== todoToRepeat.task;
      }), todoToRepeat]
    })
  }
  addTodo =(todoToAdd) => {
    const newListItem = {
      task: todoToAdd,
      completed: false,
      repeat: false
    }
    this.setState({
      todos: [...this.state.todos, newListItem]
      //todos: this.state.todos.concat(todoToAdd)
    //.push mutates array, concat/spreading do not
    })
  }
 }

function Heading () {
  return <h1>Jack's Todos</h1>
}

function List ({todos, strikeTodo, repeatTodo}) {
  return (
    <ul>
      {todos.map((todo, i) => {
        return <Todo 
        todo={todo} 
        key={i}
        strikeTodo={strikeTodo}
        repeatTodo={repeatTodo}
        />
      })}
    </ul>
  )
}

function Todo ({todo, strikeTodo, repeatTodo}) {
  if (todo.repeat) {
    todo.repeat = false;
    todo.completed = false;
  }
  if(!todo.completed) return <li onClick={() =>strikeTodo(todo.task)} className="list" onDoubleClick={() =>repeatTodo(todo)}>{todo.task}</li>
  else return <li onClick={() =>strikeTodo(todo.task)} className="complete" onDoubleClick={() =>repeatTodo(todo)}>{todo.task}</li>
}

class TodoAdder extends React.Component {
  state = {
    newTodo: ""
  }

  render () {
    return <input 
    type="text" 
    onKeyUp={this.handleKeyUp} 
    onChange={this.handleChange} 
    value={this.state.newTodo}/>
  }
  handleChange = event => {
    this.setState({
      newTodo: event.target.value
    })
  }
  handleKeyUp = event => {
        if (event.key === "Enter")
        this.props.addTodo(event.target.value)
      }
}

// function TodoAdder ({addTodo}) {
//   return <input type="text" onKeyUp={handleKeyUp}/>

//   function handleKeyUp (event) {
//     if (event.key === "Enter")
//     addTodo(event.target.value)
//   }
// }

export default App;

//button    this.props.addTodo(this.state.newTodo)