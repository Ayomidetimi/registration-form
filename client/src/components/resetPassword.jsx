import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { token } = useParams()

  function handleSubmit(event) {
    event.preventDefault()
    setMessage('')

    axios.post(`http://localhost:3000/auth/reset-password/${token}`, {
      password,
    }).then((response) => {
      if (response.data.status) {
        navigate('/login')
      } else {
        setMessage(response.data.message || 'Unable to reset your password. Please try again.')
      }
    }).catch((error) => {
      console.error(error)
      setMessage(error.response?.data?.message || 'Unable to reset your password. Please try again.')
    })
  }

  return (
    <div className="auth-content reset-password-content">
      <div className="mobile-brand" aria-hidden="true">
        <span className="brand-mark">k</span>
        <span>kindred</span>
      </div>

      <div className="form-heading">
        <span className="eyebrow form-eyebrow">ACCOUNT RECOVERY</span>
        <h2>Reset your password</h2>
        <p>Choose a new password to get back into your account.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>New password</span>
          <input
            type="password"
            name="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength="8"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        <button className="submit-button" type="submit">
          Send <span aria-hidden="true">→</span>
        </button>

        {message && (
          <p className="form-message" role="alert">
            {message}
          </p>
        )}
      </form>

      <p className="switch-prompt">
        Remembered your password?{' '}
        <Link className="text-button" to="/login">
          Back to log in
        </Link>
      </p>

      <p className="form-footnote">Your new password will secure your account.</p>
    </div>
  )
}

export default ResetPassword
