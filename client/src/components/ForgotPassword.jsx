import { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault()
    Axios.post('http://localhost:3000/auth/forgot-password', {
      email: email
     },
    ).then((response) => {
      if (response.data.status) {
        alert('Password reset email sent. Please check your inbox.')
        setSubmitted(true)
        navigate('/login')
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className="auth-content">
      <div className="mobile-brand" aria-hidden="true">
        <span className="brand-mark">k</span>
        <span>kindred</span>
      </div>

      <div className="form-heading">
        <span className="eyebrow form-eyebrow">ACCOUNT RECOVERY</span>
        <h2>Forgot your password?</h2>
        <p>Enter the email address linked to your account.</p>
      </div>

      {submitted ? (
        <div className="reset-confirmation" role="status" aria-live="polite">
          <span className="confirmation-icon" aria-hidden="true">✓</span>
          <div>
            <h3>Request received</h3>
            <p>
              Password reset emails aren’t enabled yet, so no email was sent.
              We’ll send instructions to <strong>{email}</strong> once this
              feature is connected.
            </p>
          </div>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <button className="submit-button" type="submit">
            Request reset link <span aria-hidden="true">→</span>
          </button>
        </form>
      )}

      <p className="switch-prompt">
        Remembered your password?{' '}
        <Link className="text-button" to="/login">
          Back to log in
        </Link>
      </p>

      <p className="form-footnote">We’ll help you get back to your space.</p>
    </div>
  )
}

export default ForgotPassword
