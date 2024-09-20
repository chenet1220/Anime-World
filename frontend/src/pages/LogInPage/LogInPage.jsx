import { useState } from 'react';
import * as authService from '../../services/authService';

import { useNavigate } from "react-router-dom";  


export default function LogInPage({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate(); 

  async function handleSubmit(evt) {
    console.log('handleSubmit');
    console.log('formData:', formData);
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);
      setUser(user);
      console.log('user:', user);
      console.log('should now navigate to /');
      navigate("/");
    } catch (err) {
      // An error occurred
      setErrorMsg('Log In Failed - Try Again');
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  return (
    <>
      <h2>Log In!🖥️</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password🤐</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">LOG IN👋</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}