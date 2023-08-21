import React, { useState } from "react";
import Input from "../../components/input/input";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [data, setdata] = useState([
    {
      email: "",
      name: "",
      username: "",
      password: "",
    },
  ]);
  const handleDataChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const handlesubmit = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/guest/register",
        data
      );
      console.log(response.data);

      if (response.data.status == "success") {
        console.log("/here");

        navigate("/");
      } else {
        console.log("error");
      }
    } catch (err) {
      setError(true);
      setErrorContent(err.response.data.message);
    }
  };
  return (
    <>
      <div className=" flex column center signup-container">
        <div className="logo">Books</div>
        <div className="header-text">
          Sign up tp see photos and videos from your friends
        </div>
        <div className="facebook roundedMedium bold">Log in with facebook</div>
        <div className="or">
          <span></span>OR<span></span>
        </div>
        <div className="inputs flex column">
          <Input
            onchange={handleDataChange}
            label={"Mobile Number or Email"}
            name={"email"}
            type={"email"}
          />
          <Input
            onchange={handleDataChange}
            label={"Full Name"}
            name={"name"}
            type={"text"}
          />
          <Input
            onchange={handleDataChange}
            label={"Username"}
            name={"username"}
            type={"text"}
          />
          <Input
            onchange={handleDataChange}
            label={"Password"}
            name={"password"}
            type={"password"}
          />
        </div>
        {error ? (
          <div className="error">{errorContent}</div>
        ) : (
          <div className="bottom-text text">
            People who use our service may have uploaded your contact
            information to Instagram<a href="#">Learn More</a>
          </div>
        )}
        <div className="policy text">
          By signing up, you agree to our{" "}
          <a href="#"> Terms , Privacy Policy</a> and{" "}
          <a href="#">Cookies Policy .</a>
        </div>
        <button className="facebook roundedMedium bold" onClick={handlesubmit}>
          Sign up
        </button>
        <div className="have-account">
          Have an account? <a href="/"> Log in</a>
        </div>
      </div>
    </>
  );
}

export default Register;
