import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function StudentTable() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    fetch('http://localhost:8000/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Fetch error:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      fetch(`http://localhost:8000/students/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          alert("Student deleted successfully");
          fetchStudents(); // Refresh the list after deletion
        })
        .catch((err) => {
          console.error("Error deleting student:", err);
        });
    }
  };

  return (
    <div className="container">
      <h2>Student Records</h2>
      <div className="table-container">
        <Link to="/student/create" className="btn btn-add">Add New Student</Link>
        <table>
          <thead>
            <tr>
              <th>#</th> {/* Changed from ID to a simple index number */}
              <th>Name</th>
              <th>Place</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td> {/* Show index-based numbering */}
                <td>{student.name}</td>
                <td>{student.place}</td>
                <td>{student.phone}</td>
                <td>
                  <Link to={`/student/view/${student.id}`} className="btn btn-view">View</Link>
                  <Link to={`/student/edit/${student.id}`} className="btn btn-edit">Edit</Link>
                  <button className="btn btn-delete" onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
