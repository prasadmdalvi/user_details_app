import React, { useState,useEffect } from 'react';
import axios from 'axios';

function UserForm({ editingUser,setEditingUser,refreshUsers }) {

  

  const [form, setForm] = useState({  id: null, name: '', email: '', password: '', dob: '' });
  
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    if(editingUser){
      setForm(editingUser);
    }else{
      setForm({
        id: null,
        name: '',
        email: '',
        password: '',
        dob: ''
      });
    }
  }, [editingUser]);

  const handleSubmit = async e => {
    e.preventDefault(); 
    try {
      if(form.id){
        await axios.post('http://localhost/api/user/update.php', form);
        alert('User updated');
      }else{
        await axios.post('http://localhost/api/user/create.php', form);
        alert('User added');
      }
      setForm({ id: null, name: '', email: '', password: '', dob: '' });
      setEditingUser(null);
      refreshUsers(); 
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save user.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;
