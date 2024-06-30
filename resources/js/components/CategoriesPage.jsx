import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import LeaftMenue from '../components/LeaftMenue';

export const CategoriesPage = () => {
  const [category, setcategory] = useState([]);
  const [editcategory, setEditcategory] = useState(null);
  const [Newcategory, setNewcategory] = useState({
    name: '',
    user_id: '',
     });
  const [formData, setFormData] = useState({
    name: '',
    user_id: '',
 
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredcategory, setFilteredcategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/category', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.status) {
          setcategory(response.data.category);
          setFilteredcategory(response.data.category);
        } else {
          console.error('Failed to fetch category:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchcategory();
  }, []);

  useEffect(() => {
    const filtercategory = () => {
      const search = searchQuery.toLowerCase();
      const filtered = category.filter(
        (category) =>
          category.name.toLowerCase().includes(search) ||
          category.user.name.toLowerCase().includes(search)
      );
      setFilteredcategory(filtered);
    };

    filtercategory();
  }, [searchQuery, category]);

  const handleEditClick = (category) => {
    setEditcategory(category);
    setFormData({
      name: category.name,
      user_id: category.user.name,
     
    });
    setShowEditModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/edit-category/${editcategory.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.status) {
        setcategory(category.map(category => 
          category.id === editcategory.id ? response.data.category : category
        ));
        setEditcategory(null);
        setShowEditModal(false);
        navigate("/categories");
      } else {
        console.error('Failed to update category:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleClose = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setEditcategory(null);
  };

  const handleAddcategoryClick = () => {
    setNewcategory({
      name: '',
      user_id: ''
    
    });
    setShowAddModal(true);
  };

  const handleNewcategoryChange = (e) => {
    const { name, value } = e.target;
    setNewcategory({ ...Newcategory, [name]: value });
  };

  const handleAddcategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/add-category', Newcategory, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.status) {
        setcategory([...category, response.data.category]);
        setShowAddModal(false);
      } else {
        console.error('Failed to add category:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="wrapper d-flex h-100">
      <LeaftMenue />
      
      <div className="container-fluid px-4">
        <div className="pageTitle pt-3 pb-3 md-pt-0">
          <h3 className="md-mb-0">category</h3>

          <div className="d-flex justify-content-end align-items-center">
            <form className="col-xl-4 col-md-auto col-lg-auto mb-0 me-xl-3" role="search">
              <div className="input-group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                  placeholder="Search by category name or user name"
                />
                <button type="button" className="btn">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
            <button id="generateReport" type="button" onClick={handleAddcategoryClick} class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalGenerateReport">
                      Add category
                    </button>
          </div>
        </div>

        <div className="card-body p-2">
         
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>category Name</th>
                <th>User Name</th>          
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredcategory.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.user.name}</td>             
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEditClick(category)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit category Modal */}
          <Modal show={showEditModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleUpdate}>
                <Form.Group controlId="categoryName">
                  <Form.Label>category Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="userName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_id"
                    value={formData.user_id}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>          
            
                <Button variant="primary" type="submit">
                  Update
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Add category Modal */}
          <Modal show={showAddModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAddcategory}>
                <Form.Group controlId="NewcategoryName">
                  <Form.Label>category Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={Newcategory.name}
                    onChange={handleNewcategoryChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="newUserName">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_id"
                    value={Newcategory.user_id}
                    onChange={handleNewcategoryChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Add
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};
