import React, { useState } from "react";
import { updatePasswordAPI } from "../services/allAPI";
import { useNavigate } from "react-router-dom";

const ConfirmPassword = () => {
  const Navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);
  const [pwd, setPWD] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that password is not empty
    if (!pwd.password) {
      alert("Password cannot be empty.");
      return;
    }

    // Validate that both passwords match
    if (pwd.password !== pwd.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      // Retrieve user ID from localStorage
      const user = JSON.parse(localStorage.getItem("singleUser"));
      const userId = user?._id;

      if (!userId) {
        alert("User ID not found in localStorage.");
        return;
      }

      // Prepare API request body
      const reqBody = {
        id: userId,
        password: pwd.password,
      };

      // Call the API
      const result = await updatePasswordAPI(reqBody);

      if (result.message === "Password updated successfully!") {
        alert("Password reset successfully!");
        setPWD({ password: "", confirmPassword: "" });
        Navigate('/login')
      } else {
        alert(result.message || "Failed to reset password.");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{ height: "100vh", position: "relative" }}
      className="container d-flex justify-content-center align-items-center flex-column"
    >
      <h1>RESET PASSWORD</h1>
      <p>Enter your new password below</p>
      <div
        style={{ width: "400px" }}
        className="shadow border rounded p-5 mt-5"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-5 text-center">
            <h3>
              <i className="fa-solid fa-ghost text-danger"></i> STORYVERSE
            </h3>
          </div>
          <div className="mb-4">
            <input
              value={pwd.password}
              onChange={(e) =>
                setPWD({ ...pwd, password: e.target.value })
              }
              className="form-control"
              type="password"
              placeholder="New Password"
              required
            />
          </div>
          <div className="mb-4">
            <input
              value={pwd.confirmPassword}
              onChange={(e) =>
                setPWD({ ...pwd, confirmPassword: e.target.value })
              }
              className="form-control"
              type="password"
              placeholder="Confirm New Password"
              required
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              style={{
                backgroundColor: isHovered ? "black" : "",
                color: isHovered ? "white" : "",
              }}
              className="btn btn-primary my-1"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmPassword;
