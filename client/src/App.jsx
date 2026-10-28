import { useState } from 'react'
import LoginForm from './components/LoginForm.jsx'
import SignupForm from './components/SignupForm.jsx'
import './App.css'

function App() {
  const [page, setPage] = useState('signup')

  return (
    <main className="auth-layout">
      <section className="welcome-panel" aria-label="Welcome">
        <div className="welcome-orbit welcome-orbit-one" />
        <div className="welcome-orbit welcome-orbit-two" />
        <a className="brand" href="/" aria-label="Kindred home">
          <span className="brand-mark" aria-hidden="true">
            k
          </span>
          <span>kindred</span>
        </a>

        <div className="welcome-copy">
          <span className="eyebrow">A little more in sync</span>
          <h1>Make room for what matters.</h1>
          <p>
            A thoughtful space to bring your plans, people, and ideas together.
          </p>
          <div className="welcome-note">
            <span className="note-icon" aria-hidden="true">
              ✳
            </span>
            <span>Good things happen when everything comes together.</span>
          </div>
        </div>

        <div className="welcome-footer">
          <span>Made for your next chapter</span>
          <span className="footer-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
      </section>

      <section className="form-panel" aria-label={page === 'signup' ? 'Create account' : 'Log in'}>
        {page === 'signup' ? (
          <SignupForm onSwitchToLogin={() => setPage('login')} />
        ) : (
          <LoginForm onSwitchToSignup={() => setPage('signup')} />
        )}
      </section>
    </main>
  )
}

export default App
