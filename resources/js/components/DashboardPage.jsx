import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export const DashboardPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Function to fetch products from the API
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await axios.get('/api/user-details', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.status) {
            setUsers(response.data.users); // Update state with the fetched products
        } else {
          console.error('Failed to fetch users:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="card-body p-2">
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>User Name</th>
            <th>User phone</th>
            <th>User E-mail</th>
            <th>User Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.created_at}</td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
