import React, { useState } from "react";
import { db } from "../firebase"; 
import { collection, addDoc } from "firebase/firestore";

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();

    // --- Validation ---
    if (!name.trim()) {
        alert("Name is required");
        return;
    }

    if (name.trim().length < 3) {
        alert("Name must be at least 3 characters");
        return;
    }

    if (!email.includes("@")) {
        alert("Invalid email");
        return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Phone must be 10 digits");
        return;
    }

    // --- If validation passes, submit to Firestore ---
    try {
        setLoading(true);
        await addDoc(collection(db, "users"), {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        timestamp: new Date()
        });

        // Clear form
        setName("");
        setEmail("");
        setPhone("");

        // Show success alert
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
        console.error("Error adding document: ", err);
        alert("Error submitting form. Check console.");
    } finally {
        setLoading(false);
    }
    };

  return (
    <div className="container mt-5">
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone:</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
  {loading ? (
    <>
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Submitting...
    </>
  ) : (
    "Register"
  )}
</button>

      </form>

      {/* ✅ Success Alert */}
      {success && (
        <div className="alert alert-success mt-3" role="alert">
          Registration successful!
        </div>
      )}
    </div>
  );
}

export default Registration;
