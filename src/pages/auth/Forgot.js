import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import { forgotPassword, validateEmail } from '../../service/authService';
import { Link } from 'react-router-dom';

const Forgot = () => {

  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter an email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email, 
    };

    await forgotPassword(userData);
    setEmail("");
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      <form onSubmit={forgot}>
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="--btn --btn-primary --btn-block">
          Get Reset Email
        </button>
        <div>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>

    </div>
  )
}

export default Forgot
