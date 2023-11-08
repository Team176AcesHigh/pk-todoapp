import React, { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Todo } from './components/model';
import TodoEntry from './components/TodoEntry';

const App: React.FC = () => {
  
  const[todo, setTodo] = useState<string>("");
  const[todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    
    if(todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
   
  };

  const updateTodo = (id: number, todo: Todo) => {
    console.log(todo)
    let newTodoList = todos.map(t => {
      if(t.id === id) {
        // This is the target of our modifications, update/replace its value
        
        // Set the id of the provided object just in case they aren't being honest and cause a data inconsistency
        todo.id = id;

        return todo;
      } else {
        // Leave it unchanged
        return t;
      }
    })
    setTodos(newTodoList);
  }

  const removeTodo = (id: number)  => {
    setTodos(todos.filter(t => t.id !== id));
  }

  console.log(todos);

  return (
    <div className="App"> 
      <span className="heading">Aces todo</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      {todos.map(t => <TodoEntry
        todo={t}
        updateFunction={updateTodo}
        removeFunction={removeTodo}
        />
      )}
    </div>

  );
};


export default App;
