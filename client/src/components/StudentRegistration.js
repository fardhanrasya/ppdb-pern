import React, { useState } from 'react';
import axios from 'axios';
import { validateEmail, validatePhone } from '../utils/validation';

function StudentRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const { name, email, phone, address } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    let errors = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!validateEmail(email)) errors.email = 'Invalid email address';
    if (!validatePhone(phone)) errors.phone = 'Invalid phone number';
    if (!address.trim()) errors.address = 'Address is required';
    return errors;
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/students/register', formData);
      alert('Registration successful!');
      setFormData({ name: '', email: '', phone: '', address: '' });
      setErrors({});
    } catch (err) {
      console.error(err.response.data);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Student Registration</h2>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} required />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div>
          <input type="text" placeholder="Address" name="address" value={address} onChange={onChange} required />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default StudentRegistration;