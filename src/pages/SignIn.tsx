import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { SubHeader } from "../components/SubHeader";

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || password.length < 3) {
      if (!email) {
        alert('Please fill in all fields.');
      }
      if (password.length < 3) {
        alert('Please enter a password of more than 3 characters.');
      }
    } else {
      navigate('/main');
    }
  }
  return (
    <>
      <SubHeader />
      <main className="sign-in-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form
          className="sign-in-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h2 className="sign-in-form__title">Sign In</h2>
          <label className="input">
            <span className="input__heading">Email</span>
            <input
              data-test-id="auth-email"
              name="email" type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="input">
            <span className="input__heading">Password</span>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button data-test-id="auth-submit" className="button" type="submit">
            Sign In
          </button>
        </form>
        <span>
          Don't have an account?
          <Link
            data-test-id="auth-sign-up-link"
            to="/sign-up"
            className="sign-in-form__link"
          >
            Sign Up
          </Link>
        </span>
      </main>
    </>
  )
}