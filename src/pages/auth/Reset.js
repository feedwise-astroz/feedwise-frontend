import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../service/authService';


const initialState = {
  password: "",
  confirmPassword: "",
};


  
const Reset = () => {

  const [formData, setformData] = useState(initialState);
  const { password, confirmPassword } = formData;

  const { resetToken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
      confirmPassword,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
    
      <div>
        
          <div>
            <h2>Pease Reset your Password</h2>
            <form onSubmit={reset}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
              <button type="submit" className='primary'>submit</button>
            </form>
            <span>
              <Link to="/login">Login</Link>
            </span>

          </div>
        
      </div>
    
    </div>
  )
}

export default Reset
