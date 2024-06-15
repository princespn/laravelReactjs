import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    user_id: '',
    discription: '',
    price: 0,
  });
  const [formData, setFormData] = useState({
    name: '',
    user_id: '',
    discription: '',
    price: 0,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/products', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.status) {
          setProducts(response.data.products);
        } else {
          console.error('Failed to fetch products:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      user_id: product.user.id,
      discription: product.discription,
      price: product.price
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
      const response = await axios.put(`/api/edit-products/${editProduct.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.status) {
        setProducts(products.map(product => 
          product.id === editProduct.id ? response.data.product : product
        ));
        setEditProduct(null);
        setShowEditModal(false);
      } else {
        console.error('Failed to update product:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleClose = () => {
    setShowEditModal(false);
    setShowAddModal(false);
    setEditProduct(null);
  };

  const handleAddProductClick = () => {
    setNewProduct({
      name: '',
      user_id: '',
      discription: '',
      price: 0,
    });
    setShowAddModal(true);
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/add-products', newProduct, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.status) {
        setProducts([...products, response.data.product]);
        setShowAddModal(false);
      } else {
        console.error('Failed to add product:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="card-body p-2">
      <Button variant="primary" onClick={handleAddProductClick}>
        Add Product
      </Button>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Product Name</th>
            <th>User Name</th>
            <th>Product Description</th>
            <th>Product Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.user.name}</td>
              <td>{product.discription}</td>
              <td>{product.price}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEditClick(product)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
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
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.discription}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
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

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group controlId="newProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleNewProductChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="newUserName">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                name="user_id"
                value={newProduct.user_id}
                onChange={handleNewProductChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="newProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="discription"
                value={newProduct.discription}
                onChange={handleNewProductChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="newProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleNewProductChange}
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
  );
};