import React, { useEffect, useState } from 'react';
import { doc, deleteDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { Modal, Button, Spinner } from "react-bootstrap";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userData);
      } catch (err) {
        console.error(err);
        alert("Error fetching users");
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const sortBy = (key) => {
    const sorted = [...users].sort((a, b) =>
      a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
    );
    setUsers(sorted);
  };

  // Edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setShowEditModal(true);
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, { name, email, phone });

      setUsers(users.map(u =>
        u.id === editingUser.id ? { ...u, name, email, phone } : u
      ));
      setShowEditModal(false);
      setEditingUser(null);
      alert("User updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
    setLoading(false);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, "users", id));
      setUsers(users.filter(u => u.id !== id));
      alert("User deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
    setLoading(false);
  };

  // Filter
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card shadow p-4">
      <h2 className="mb-3">Registered Users</h2>

      {/* Loader */}
      {loading && (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" role="status" />
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th onClick={() => sortBy("name")} style={{ cursor: "pointer" }}>Name</th>
              <th onClick={() => sortBy("email")} style={{ cursor: "pointer" }}>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Button size="sm" className="me-2" onClick={() => handleEdit(user)} disabled={loading}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(user.id)} disabled={loading}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label>Name</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required minLength={3} />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Phone</label>
              <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={10} />
            </div>
            <Button type="submit" variant="success" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Update"}
            </Button>
            <Button variant="secondary" className="ms-2" onClick={() => setShowEditModal(false)} disabled={loading}>Cancel</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserList;
