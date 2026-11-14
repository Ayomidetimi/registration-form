
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import './App.css';
import ResetPassword from './components/resetPassword.jsx';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="auth-layout">
      <section className="welcome-panel" aria-label="Welcome">
        <div className="welcome-orbit welcome-orbit-one" />
        <div className="welcome-orbit welcome-orbit-two" />

        <a className="brand" href="/" aria-label="Kindred home">
          <span className="brand-mark" aria-hidden="true">k</span>
          <span>kindred</span>
        </a>

        <div className="welcome-copy">
          <span className="eyebrow">A little more in sync</span>
          <h1>Make room for what matters.</h1>
          <p>
            A thoughtful space to bring your plans, people, and ideas together.
          </p>
          <div className="welcome-note">
            <span className="note-icon" aria-hidden="true">✳</span>
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

      <section
        className="form-panel"
        aria-label={
          location.pathname === '/signup'
            ? 'Create account'
            : location.pathname === '/forgot-password'
              ? 'Reset password'
              : 'Log in'
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />

          <Route
            path="/signup"
            element={
              <SignupForm
                onSwitchToLogin={() => navigate('/login')}
              />
            }
          />

          <Route
            path="/login"
            element={
              <LoginForm
                onSwitchToSignup={() => navigate('/signup')}
              />
            }
          />

          <Route
            path="/resetPassword/:token"
            element={<ResetPassword />}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;