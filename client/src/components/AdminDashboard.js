import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/students', {
          headers: { 'x-auth-token': token }
        });
        setStudents(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchStudents();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/students/${id}`, 
        { status: newStatus },
        { headers: { 'x-auth-token': token } }
      );
      setStudents(students.map(student => 
        student.id === id ? { ...student, status: newStatus } : student
      ));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.status}</td>
              <td>
                <button onClick={() => updateStatus(student.id, 'approved')}>Approve</button>
                <button onClick={() => updateStatus(student.id, 'rejected')}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;