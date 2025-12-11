'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
}

interface Order {
  _id: string
  productId: string
  quantity: number
  status: string
  createdAt: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [showProductForm, setShowProductForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  })

  const productServiceUrl = process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL || 'http://localhost:3001'
  const orderServiceUrl = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL || 'http://localhost:3002'

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts()
    } else {
      fetchOrders()
    }
  }, [activeTab])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${productServiceUrl}/api/products`)
      setProducts(response.data)
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${orderServiceUrl}/api/orders`)
      setOrders(response.data)
    } catch (err) {
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${productServiceUrl}/api/products`, {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock)
      })
      setFormData({ name: '', description: '', price: '', category: '', stock: '' })
      setShowProductForm(false)
      fetchProducts()
      alert('Product created successfully!')
    } catch (err) {
      alert('Failed to create product')
      console.error('Error creating product:', err)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    try {
      await axios.delete(`${productServiceUrl}/api/products/${id}`)
      fetchProducts()
      alert('Product deleted successfully!')
    } catch (err) {
      alert('Failed to delete product')
      console.error('Error deleting product:', err)
    }
  }

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await axios.patch(`${orderServiceUrl}/api/orders/${orderId}`, { status })
      fetchOrders()
      alert('Order status updated!')
    } catch (err) {
      alert('Failed to update order status')
      console.error('Error updating order:', err)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>Algonquin Pet Store - Admin Dashboard</h1>
        </div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Algonquin Pet Store - Admin Dashboard</h1>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

      {activeTab === 'products' && (
        <div>
          <button className="btn" onClick={() => setShowProductForm(!showProductForm)}>
            {showProductForm ? 'Cancel' : 'Add New Product'}
          </button>

          {showProductForm && (
            <form className="form" onSubmit={handleCreateProduct}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn">Create Product</button>
            </form>
          )}

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.substring(0, 8)}...</td>
                  <td>{order.productId.substring(0, 8)}...</td>
                  <td>{order.quantity}</td>
                  <td>
                    <span className={`status ${order.status}`}>{order.status}</span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    {order.status === 'pending' && (
                      <button
                        className="btn"
                        onClick={() => handleUpdateOrderStatus(order._id, 'processing')}
                      >
                        Start Processing
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button
                        className="btn"
                        onClick={() => handleUpdateOrderStatus(order._id, 'completed')}
                      >
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

