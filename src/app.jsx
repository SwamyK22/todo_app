import React, { createRef, PureComponent } from 'react';
import './style.scss';
import './todo.scss';
import TodoFilter from './todoFilter';
import TodoForm from './todoForm';
import TodoList from './todoList';

const requestState = ({appState, type, loadingId = -1}) => [
   ...appState, 
    { type, status: 'REQUEST', loadingId }  
]

const successState = ({appState, type, loadingId = -1}) => appState.filter(x => !(x.type === type && x.loadingId === loadingId));

const errorState = ({appState, type, error, loadingId=-1}) =>  appState.map((x) =>{
    if(x.type === type && x.loadingId === loadingId){
      return { ...x, status:'ERROR', message: error.message}
    }
  });

export default class app extends PureComponent {
  state = {
    todoList: [],
    filterStatus: 'all',
    appState: [],
  };

  todoTextRef = createRef();

  componentDidMount(){
    this.loadTodo('all');
  }

  loadTodo = async (filterStatus) =>{
    const type = 'LOAD_TODO';
    try {

      this.setState(({ appState }) => { 
        return { 
          appState: requestState({appState, type}),
         }})

      let url = 'http://localhost:3000/todoList';

      if(filterStatus !== 'all'){
        url = url + `?isDone=${filterStatus === 'completed'}`;
      }

    const res = await fetch(url);
    const json = await res.json();
    this.setState(({ appState }) => { 
      return {todoList:json,
         filterStatus,
      appState: successState({appState, type}),
     }});
    } catch (error) {
      this.setState(({ appState }) => ({ 
        appState: errorState({appState, type, error})
      }));
    }
  }

  addTodo = async (event) => {
    const type = 'ADD_TODO';
    event.preventDefault();
    try {
      this.setState(({ appState }) => { 
        return { 
          appState: requestState({appState, type}),
         }});

      const res = await fetch("http://localhost:3000/todoList", {
        method: 'POST',
        body: JSON.stringify({
          isDone: false,
          text: this.todoTextRef.current.value
        }),
        headers: {
          "Content-Type":"application/json",
          Accept: "application/json",
        }
      });
      const json = await res.json();
    this.setState(({ todoList, appState }) => ({
      todoList: [...todoList, json],
      appState: successState({appState, type}),
    }), () => {
      this.todoTextRef.current.value = '';
    });
    } catch (error) {
      this.setState(({ appState }) => ({ 
        appState: errorState({appState, type, error})
      }));
    }
    
  };

  updateTodo = async (item) => {
    const type = 'UPDATE_TODO';
    const loadingId = item.id
    try {
      this.setState(({ appState }) => { 
        return { 
          appState: requestState({appState, type, loadingId}),
         }});
      const res = await fetch(`http://localhost:3000/todoList/${item.id}`,
      {
        method:'PUT',
        body: JSON.stringify({
          ...item,
          isDone: !item.isDone,
        }),
        headers: {
          "Content-Type":"application/json",
          Accept: "application/json",
        }
      });
      const json = await res.json();

    this.setState(({ todoList, appState }) => {
      const index = todoList.findIndex((x) => x.id === item.id);
      return {
        todoList: [
          ...todoList.slice(0, index),
          json,
          ...todoList.slice(index + 1),
        ],
        appState: successState({appState, type, loadingId})
      };
    });
  } catch (error) {
    this.setState(({ appState }) => ({ 
      appState: errorState({appState, type, error, loadingId})
    }));
  }
  };

  deleteTodo = async (item) => {
    const isConfirm = confirm('Are you sure to delete this item');

    if (isConfirm) {
      const type = 'DELETE_TODO';
      const loadingId = item.id;
      try {
        this.setState(({ appState }) => { 
          return { 
            appState: requestState({appState, type, loadingId}),
           }});
        await fetch(`http://localhost:3000/todoList/${item.id}`,
        {
          method:'DELETE'
        });
        this.setState(({ todoList, appState }) => {
          const index = todoList.findIndex((x) => x.id === item.id);
          return {
            todoList: [
              ...todoList.slice(0, index),
              ...todoList.slice(index + 1),
            ],
            appState: successState({appState, type, loadingId}),
          };
        });
      } catch (error) {
        this.setState(({ appState }) => ({ 
          appState: errorState({appState, type, error, loadingId})
        }));
      }
    }
  };


  render() {
    const { todoList, filterStatus, appState } = this.state;

    const laodTodoState = appState.find(x => x.type === 'LOAD_TODO');

    const addTodoState = appState.find(x => x.type === 'ADD_TODO');

    const updateTodoState = appState.filter(x => x.type === 'UPDATE_TODO');

    const deleteTodoState = appState.filter(x => x.type === 'DELETE_TODO');


    if(laodTodoState?.status === 'REQUEST'){
      return <h1>Loading...</h1>
    }

    if(laodTodoState?.status === 'ERROR'){
      return <h1>{ laodTodoState.message }</h1>
    }

    // if(todoList.length > 8){
    //   throw new Error('Somthing went Wrong')
    // }

    return (
      <div className="todo">
        <h1 className="todo__title">Todo App</h1>
        <TodoForm addTodo={this.addTodo} ref={this.todoTextRef} addTodoState={addTodoState} />
        <div className="todo__list">
         {todoList.length > 0 && <TodoList
          todoList={todoList}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
          updateTodoState={updateTodoState}
          deleteTodoState={deleteTodoState}
        />}
        </div>
        <TodoFilter filterStatus={filterStatus} filterTodo={this.loadTodo} />
      </div>
    );
  }
}
