import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ViewDetails() {
  const { studentid } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Student not found");
        }
        return res.json();
      })
      .then((data) => {
        setStudent(data);
      })
      .catch((err) => {
        alert(err.message);
        navigate("/");
      });
  }, [studentid, navigate]);

  return (
    <div className="container">
      <h2>View Student Details</h2>
      {student ? (
        <div>
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Place:</strong> {student.place}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <button className="btn btn-delete" onClick={() => navigate("/")}>Back</button>
        </div>
      ) : (
        <p>Loading student details...</p>
      )}
    </div>
  );
}
