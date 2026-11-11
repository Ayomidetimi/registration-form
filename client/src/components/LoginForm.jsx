import { useState } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function LoginForm({ onSwitchToSignup }) {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  
  function handleSubmit(event) {
    event.preventDefault()
    Axios.post('http://localhost:3000/auth/login', {
      email: email,
      password: password
     },
     {
      withCredentials: true
     }
    ).then((response) => {
      if (response.data.status) {
        navigate('/dashboard')
      }
    }).catch((error) => {
      console.error(error);
      setMessage('Invalid email or password. Please try again.');
    });
  }

  return (
    <div className="auth-content">
      <div className="mobile-brand" aria-hidden="true">
        <span className="brand-mark">k</span>
        <span>kindred</span>
      </div>
      <div className="form-heading">
        <span className="eyebrow form-eyebrow">WELCOME BACK</span>
        <h2>Good to see you</h2>
        <p>Pick up right where you left off.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Email address</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
          />
        </label>

        <label className="field">
          <span>Password</span>
          <span className="password-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </span>
        </label>

        <div className="login-options">
          <label className="remember-option">
            <input type="checkbox" name="remember" />
            <span>Remember me</span>
          </label>
          <Link className="forgot-link" to="/forgot-password">
            Forgot password?
          </Link>
        </div>

        <button className="submit-button" type="submit">
          Log in <span aria-hidden="true">→</span>
        </button>
        {message && (
          <p className="form-message" role="status">
            {message}
          </p>
        )}
      </form>

      <p className="switch-prompt">
        New to kindred?{' '}
        <button className="text-button" type="button" onClick={onSwitchToSignup}>
          Create an account
        </button>
      </p>

      <p className="form-footnote">Your space is just as you left it.</p>
    </div>
  )
}

export default LoginForm
