import React, { useState } from "react";
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { Button, Spinner } from "react-bootstrap";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || name.trim().length < 3) return alert("Name must be at least 3 characters");
    if (!email.includes("@")) return alert("Invalid email");
    if (phone.length !== 10 || isNaN(phone)) return alert("Phone must be 10 digits");

    try {
      setLoading(true);
      await addDoc(collection(db, "users"), {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        timestamp: new Date()
      });

      setName(""); setEmail(""); setPhone("");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Error submitting form. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow p-4">
      <h2 className="mb-4">Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={3}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone:</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            maxLength={10}
          />
        </div>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Submitting...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </form>

      {success && (
        <div className="alert alert-success mt-3" role="alert">
          Registration successful!
        </div>
      )}
    </div>
  );
}

export default Registration;
