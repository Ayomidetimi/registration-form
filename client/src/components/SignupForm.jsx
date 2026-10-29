import { useState } from 'react'
import axios from 'axios'

function SignupForm({ onSwitchToLogin }) {
  const[username, setUsername] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');


  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:3000/auth/register', {
      username: username,
      email: email,
      password: password
    }).then((response) => {
      console.log(response.data);
      setMessage('Your details are ready. Connect an account service to finish signing up.');
    }).catch((error) => {
      console.error(error);
      setMessage(error.response?.data?.message || 'An error occurred during signup. Please try again.');
    })
  
  }



  return (
    <div className="auth-content">
      <div className="mobile-brand" aria-hidden="true">
        <span className="brand-mark">k</span>
        <span>kindred</span>
      </div>
      <div className="form-heading">
        <span className="eyebrow form-eyebrow">GET STARTED FOR FREE</span>
        <h2>Create your account</h2>
        <p>Start bringing your good ideas to life.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Your name</span>
          <input
            type="text"
            name="name"
            placeholder="e.g. Alex Morgan"
            autoComplete="name"
            minLength="2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Email address</span>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Password</span>
          <span className="password-wrap">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <label className="consent-option">
          <input type="checkbox" name="terms" required />
          <span>
            I agree to the <a href="#terms">Terms of Service</a> and{' '}
            <a href="#privacy">Privacy Policy</a>.
          </span>
        </label>

        <button className="submit-button" type="submit">
          Create account <span aria-hidden="true">→</span>
        </button>
        {message && (
          <p className="form-message" role="status">
            {message}
          </p>
        )}
      </form>

      <p className="switch-prompt">
        Already have an account?{' '}
        <button className="text-button" type="button" onClick={onSwitchToLogin}>
          Log in
        </button>
      </p>

      <p className="form-footnote">By continuing, you agree to our terms and privacy policy.</p>
    </div>
  )
}

export default SignupForm;
