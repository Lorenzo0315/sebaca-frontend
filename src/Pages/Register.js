import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
    department: '',
    year: '',
    section: '',
    role: 'Student'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7199/api/auth/register', formData);
      setMessage('Registration successful! Please login.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label>Full Name</label>
              <input type="text" name="fullName" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Student ID</label>
              <input type="text" name="studentId" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" name="email" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" name="password" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Department</label>
              <input type="text" name="department" className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Year</label>
              <input type="text" name="year" className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Section</label>
              <input type="text" name="section" className="form-control" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-success">Register</button>
          </form>
          {message && <p className="mt-3">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;