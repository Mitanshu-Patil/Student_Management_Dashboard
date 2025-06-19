import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateStudent() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Stop submission if any field is empty
    if (
      id.trim() === "" ||
      name.trim() === "" ||
      place.trim() === "" ||
      phone.trim() === ""
    ) {
      return;
    }

    const studentData = { id, name, place, phone };

    fetch("http://localhost:8000/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    })
      .then(() => {
        alert("Student saved successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error saving student:", err);
      });
  };

  return (
    <div className="container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          {submitted && id.trim() === "" && (
            <span style={{ color: "red", fontSize: "13px" }}>
              Please enter ID
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {submitted && name.trim() === "" && (
            <span style={{ color: "red", fontSize: "13px" }}>
              Please enter your name
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Place:</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          {submitted && place.trim() === "" && (
            <span style={{ color: "red", fontSize: "13px" }}>
              Please enter place
            </span>
          )}
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {submitted && phone.trim() === "" && (
            <span style={{ color: "red", fontSize: "13px" }}>
              Please enter phone number
            </span>
          )}
        </div>

        <button type="submit" className="btn btn-add">
          Save
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
