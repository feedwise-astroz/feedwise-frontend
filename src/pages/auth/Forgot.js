import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword, validateEmail } from "../../service/authService";
import { Link } from "react-router-dom";
import FormLabel from "../../components/styled-components/FormLabel";
import FormInput from "../../components/styled-components/FormInput";
import FormButton from "../../components/styled-components/FormButton";
import "./Login.scss";
import Card from "../../components/card/Card";

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
    <div className="flex justify-center items-center h-screen px-4">
      <div className="text-center">
        <h2 className="mb-8 md:mb-10 text-xl md:text-3xl font-bold text-center">
          Enter Your Registered Email Id
        </h2>

        <Card>
          <div>
            <p className="md:mb-12 mb-8 md:mt-8 mt-6 text-secondary-color">
              A link to Reset your password will be sent your Email
            </p>
          </div>
          <form onSubmit={forgot}>
            <div className="text-left">
              {" "}
              {/* Add text-left class here */}
              <FormLabel>Email</FormLabel>
            </div>
            <FormInput
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormButton type="submit">Send Link</FormButton>
            <div className="flex flex-col items-center gap-10">
              <span className="md:mb-12 mb-6 mt-6 md:mt-12">
                Back to login page -{" "}
                <Link to="/login" className="text-primary-color">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Forgot;
