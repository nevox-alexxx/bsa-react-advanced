import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SubHeader } from "../components/SubHeader";

export function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName || !email || password.length < 3) {
      if (!fullName || !email) {
        alert('Please fill in all fields.');
      }
      if (password.length < 3) {
        alert('Please enter a password of more than 3 characters.');
      }
    } else {
      navigate('/main');
    }
  };

  return (
    <>
      <SubHeader />
      <main className="sign-up-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form 
          className="sign-up-form" 
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h2 className="sign-up-form__title">Sign Up</h2>
          <label className="input">
            <span className="input__heading">Full name</span>
            <input
              data-test-id="auth-full-name"
              name="full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>

          <label className="input">
            <span className="input__heading">Email</span>
            <input
              data-test-id="auth-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </label>

          <label className="input">
            <span className="input__heading">Password</span>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button data-test-id="auth-submit" className="button" type="submit">
            Sign Up
          </button>

        </form>
        <span>
          Already have an account?&nbsp;
          <Link
            data-test-id="auth-sign-in-link"
            to="/sign-in"
            className="sign-up-form__link"
          >
            Sign In
          </Link>
        </span>
      </main>
    </>
  )
}