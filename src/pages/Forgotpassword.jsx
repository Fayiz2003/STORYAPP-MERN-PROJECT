import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const Navigate = useNavigate()
  const [click, setClick] = useState(0);
  const [OTP, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState(""); // Store the reset token
//  console.log(resetToken);
 
 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const generatedToken = Math.floor(100000 + Math.random() * 900000); // Always 6 digits
  setResetToken(generatedToken);

  const templateParams = {
    user_email: email,
    reset_token: generatedToken,
  };

  console.log("Sending Email with Params:", templateParams); // Debug log

  try {
    await emailjs.send(
      "service_ld6s4nx",
      "template_41y6jdk",
      templateParams,
      "KT5XEc3cjx7QP96kM"
    );
    alert(`OTP has been sent to ${email}.`);
    setClick(1);
  } catch (error) {
    console.error("Failed to send reset email:", error);
    alert("Failed to send reset email. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const handleSubmit1 = (e) => {
    e.preventDefault();
    if (resetToken.toString() === OTP) {
      alert("OTP verified successfully!");
      setClick(0);
      Navigate('/confirmpassword')
      // Proceed to the next step, e.g., password reset form
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleSubmit2 = ()=>{}

  return (
    <div
      style={{ height: "100vh", position: "relative" }}
      className="container d-flex justify-content-center align-items-center flex-column"
    >
      <h1>Forgot Password</h1>
      <p>Reset your password and regain access to your account</p>
      <div
        style={{ width: "400px" }}
        className="shadow border rounded p-5 mt-5"
      >
        {click == 0 && (
          <form onSubmit={handleSubmit}>
            <div className="mb-5 text-center">
              <h3>
                <i className="fa-solid fa-envelope text-primary"></i> RESET PASSWORD
              </h3>
            </div>
            <div className="mb-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                type="email"
                placeholder="Enter a valid email"
                required
              />
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary my-1"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Email"}
              </button>
            </div>
          </form>
        )}
        {click == 1 && (
          <form onSubmit={handleSubmit1}>
            <div className="mb-5 text-center">
              <h3>
                <i className="fa-solid fa-envelope text-primary"></i> ENTER OTP
              </h3>
            </div>
            <div className="mb-4">
              <input
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                className="form-control"
                type="text"
                placeholder="Enter the OTP received via email"
                required
              />
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary my-1"
              >
                Continue
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
