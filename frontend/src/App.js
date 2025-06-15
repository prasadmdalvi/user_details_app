import React,{useState} from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import './App.css';

function App() {
  const [editingUser, setEditingUser] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false); 
  const refreshUsers = () => {
    setRefreshFlag(!refreshFlag); 
  };

  return (
    <div>
      <h2>User's Detail'</h2>
      <UserForm editingUser={editingUser} setEditingUser={setEditingUser} refreshUsers={refreshUsers} />
      <UserList setEditingUser={setEditingUser} refreshFlag={refreshFlag} />
    </div>
  );
}

export default App;
