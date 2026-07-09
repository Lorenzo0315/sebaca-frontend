import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    password: "",
    department: "",
    year: "",
    section: "",
    role: "Student",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        formData
      );

      setMessage("Registration successful! Please login.");

      setFormData({
        fullName: "",
        studentId: "",
        email: "",
        password: "",
        department: "",
        year: "",
        section: "",
        role: "Student",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed."
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <h2 className="mb-4">Student Registration</h2>

          <form onSubmit={handleRegister}>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Student ID</label>
              <input
                type="text"
                name="studentId"
                className="form-control"
                value={formData.studentId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="department"
                className="form-control"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Year</label>
              <input
                type="text"
                name="year"
                className="form-control"
                value={formData.year}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Section</label>
              <input
                type="text"
                name="section"
                className="form-control"
                value={formData.section}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-success w-100" type="submit">
              Register
            </button>

          </form>

          {message && (
            <div className="alert alert-info mt-3">
              {message}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Register;