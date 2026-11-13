import { useState } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';
function ResetPassword() {
  const[password, setPassword] = useState('');

  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3000/auth/reset-password', {
      password,
    }).then((response) => {
      if (response.data.status) {
        navigate('/login')
      }}).catch((error) => {
      console.error(error);
    })
  }



  return (
      <form className="auth-form" onSubmit={handleSubmit}>

        <label className="field">
          <span>Password</span>
          <span className="password-wrap">
            <input
              type="password"
              name="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
          </span>
        </label>

      </form>
      
  )
}

export default ResetPassword;
