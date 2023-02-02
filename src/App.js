import { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Footer from './components/Content/Footer';
import Header from './components/Content/Header';
import AddUser from './components/User/AddUser';
import UserList from './components/User/UserList';

import AddTodo from './components/Todo/AddTodo';
import EditTodo from './components/Todo/EditTodo';
import TodoList from './components/Todo/TodoList';
import EditUser from './components/User/EditUser';
  
function App() {
  useEffect(() => {
    document.title = process.env.REACT_APP_NAME;
  }, []);

  return (
    <div className="container">
      <Header/>
      <Routes>
        <Route path="/" element={
            <div>
              <p className="title is-4" style={{marginTop: '30px'}}> API REACT TEST!</p>
              <p>Cadastre e liste usuários nessa app</p>
            </div>
        } />

        <Route path="users/">
          <Route path="edit/:userId" element={<EditUser />} />
          <Route path=":userId/todos/" element={<TodoList />} />
          <Route path="" element={<UserList />} />
          <Route path="add/" element={<AddUser />} />
        </Route>

        <Route path="todos/">
          <Route path="edit/:idTodo" element={<EditTodo />} />
          <Route path="" element={<TodoList />} />
          <Route path="add/" element={<AddTodo />} />
        </Route>

      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
