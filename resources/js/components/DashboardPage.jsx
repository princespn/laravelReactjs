import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeaftMenue from '../components/LeaftMenue';

export const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Function to fetch users from the API
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        const response = await axios.get('/api/user-details', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status) {
          setUsers(response.data.users); // Update state with the fetched users
        } else {
          console.error('Failed to fetch users:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  useEffect(() => {
    // Function to filter users based on search query
    const filterUsers = () => {
      const search = searchQuery.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search)
      );
      setFilteredUsers(filtered);
    };

    filterUsers();
  }, [searchQuery, users]); // Re-run filter when searchQuery or users change

  return (
    <> 
       <div className="wrapper d-flex h-100">
      <LeaftMenue></LeaftMenue>
      
      <div className="container-fluid px-4">
        <div className="pageTitle pt-3 pb-3 md-pt-0">
          <h3 className="md-mb-0">Users</h3>

          <div className="d-flex justify-content-end align-items-center">
            {/* Search form */}
            <form className="col-xl-4 col-md-auto col-lg-auto mb-0 me-xl-3" role="search">
              <div className="input-group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                  placeholder="Search here"
                />
                <button type="button" className="btn">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="card-body p-2">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>User Name</th>
                <th>User Phone</th>
                <th>User E-mail</th>
                <th>User Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
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
      </div>
    </div>
    </>

  );
};
