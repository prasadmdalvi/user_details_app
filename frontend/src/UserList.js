import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList({setEditingUser,refreshFlag}) {
  const [users, setUsers] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost/api/user/read.php').then(response => setUsers(response.data));
  }, [refreshFlag]);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost/api/user/read.php');
    setUsers(res.data);
  };

  // return (
  //   <ul>
  //     {users.map(user => (
  //       <li key={user.id}>{user.name} | {user.email} | {user.dob}</li>
  //     ))}
  //   </ul>
  // );

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.post('http://localhost/api/user/delete.php', { id });
        fetchUsers();
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  return (
     <table style={{margin: '20px auto',borderCollapse: 'collapse',width: '80%'}}>
      <thead>
        <tr style={{backgroundColor:'#0077cc', color: '#fff'}}>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Email</th>
          <th style={thStyle}>DOB</th>
          <th style={thStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map(user => (
            <tr key={user.id} style={{borderBottom:'1px solid #ccc'}}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.dob}</td>
              <td style={tdStyle}>
                <button onClick={() =>{
                   console.log('user:', user);
                    setEditingUser(user);
                }} style={btnEditStyle}>Edit</button>
                <button onClick={() => handleDelete(user.id)} style={btnDeleteStyle}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>No users found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );  
}

const thStyle = {
  padding: '10px',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
};

const btnEditStyle = {
  marginRight: '10px',
  padding: '5px 10px',
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
};

const btnDeleteStyle = {
  padding: '5px 10px',
  backgroundColor: '#f44336',
  border: 'none',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
};


export default UserList;
