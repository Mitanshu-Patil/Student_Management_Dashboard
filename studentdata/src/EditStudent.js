import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  const { studentid } = useParams();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Student not found");
        }
        return res.json();
      })
      .then((data) => {
        setId(data.id);
        setName(data.name);
        setPlace(data.place);
        setPhone(data.phone);
      })
      .catch((err) => {
        alert("Failed to fetch student: " + err.message);
        navigate("/");
      });
  }, [studentid, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStudent = { id, name, place, phone };

    fetch(`http://localhost:8000/students/${studentid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    })
      .then(() => {
        alert("Student updated successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating student:", err);
      });
  };

  return (
    <div className="container">
      <h2>Edit Student Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Place:</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-edit">
          Update
        </button>
        <button
          type="button"
          className="btn btn-delete"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </form>
    </div>
  );
}
