import React, { useEffect, useState } from 'react'; 
import { db } from '../firebase'; 
import { collection, getDocs } from "firebase/firestore"; 

function UserList() { 
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from Firestore
  useEffect(() => { 
    const fetchUsers = async () => { 
      const querySnapshot = await getDocs(collection(db, "users")); 
      const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
      setUsers(userData); 
    }; 
    fetchUsers(); 
  }, []);

  const sortBy = (key) => {
  const sorted = [...users].sort((a, b) =>
    a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
  );
  setUsers(sorted);
};

  // Filter users based on search input
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Registered Users</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table View */}
      <table className="table table-bordered table-hover table-striped mt-3">
        <thead>
          <tr>
            <th onClick={() => sortBy("name")}>Name</th> 
            <th onClick={() => sortBy("email")}>Email</th> 
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
  );
}

export default UserList;