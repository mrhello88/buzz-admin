# Backend Integration Guide

## Overview
This dashboard is a frontend demo that uses localStorage. For a real project, backend API integration will be required.

## Current Demo Functionality

### ✅ Working (Frontend Only - localStorage)
- Services add/edit/delete (saved in localStorage)
- Categories add (saved in localStorage)
- Providers list (saved in localStorage)
- Pricing tiers management
- Orders management
- Users management
- Blogs management

### ⚠️ Backend Integration Required

## 1. Services API Integration

### Save Service
```javascript
// In services-table.jsx handleSave function
const handleSave = async () => {
  // ... validation ...
  
  try {
    const response = await fetch('/api/services', {
      method: editingService ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceId: formData.serviceId,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        provider: formData.provider,
        status: formData.status,
        pricingTiers: validTiers
      })
    })
    
    if (response.ok) {
      const savedService = await response.json()
      // Update local state
      if (editingService) {
        setServices(services.map(s => s.id === editingService.id ? savedService : s))
      } else {
        setServices([...services, savedService])
      }
    }
  } catch (error) {
    console.error('Failed to save service:', error)
    alert('Failed to save service. Please try again.')
  }
}
```

### Load Services
```javascript
useEffect(() => {
  const loadServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Failed to load services:', error)
    }
  }
  loadServices()
}, [])
```

## 2. Providers API Integration

### Sync Providers from API
```javascript
const syncProvidersFromAPI = async () => {
  try {
    const response = await fetch('/api/providers')
    const data = await response.json()
    setProviders(data.providers) // Providers list will come from API
  } catch (error) {
    console.error('Failed to sync providers:', error)
    alert('Failed to sync providers from API')
  }
}
```

**Important:** The option to manually add providers has been removed. Now providers will only sync from API.

## 3. Categories API Integration

### Add Category
```javascript
const handleAddCategory = async () => {
  if (newCategory.trim() && !categories.includes(newCategory.trim())) {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory.trim() })
      })
      
      if (response.ok) {
        const newCat = await response.json()
        setCategories([...categories, newCat.name])
        setNewCategory("")
      }
    } catch (error) {
      console.error('Failed to add category:', error)
    }
  }
}
```

## 4. Pricing Tiers Structure

### Database Schema Example
```sql
-- Services Table
CREATE TABLE services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  service_id VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  provider VARCHAR(100),
  status ENUM('Active', 'Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pricing Tiers Table
CREATE TABLE pricing_tiers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  service_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount INT DEFAULT 0,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
```

### API Response Format
```json
{
  "id": 1,
  "serviceId": "IG-FOLLOWERS-001",
  "name": "Instagram Followers",
  "category": "Instagram",
  "provider": "SMMPanel",
  "status": "Active",
  "pricingTiers": [
    { "quantity": 100, "price": 2.99, "discount": 0 },
    { "quantity": 500, "price": 9.99, "discount": 33 },
    { "quantity": 1000, "price": 15.99, "discount": 47 }
  ]
}
```

## 5. Orders API Integration

### Save Order
```javascript
const handleSave = async () => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: formData.user,
        email: formData.email,
        service: formData.service,
        quantity: formData.quantity,
        price: formData.price,
        status: formData.status,
        socialLink: formData.socialLink
      })
    })
    
    if (response.ok) {
      const order = await response.json()
      setOrders([...orders, order])
    }
  } catch (error) {
    console.error('Failed to save order:', error)
  }
}
```

## 6. Implementation Steps

### Step 1: Backend Setup
1. Database setup (MySQL/PostgreSQL/MongoDB)
2. Create API endpoints:
   - `GET /api/services` - All services
   - `POST /api/services` - Create service
   - `PUT /api/services/:id` - Update service
   - `DELETE /api/services/:id` - Delete service
   - `GET /api/providers` - All providers
   - `GET /api/categories` - All categories
   - `POST /api/categories` - Create category

### Step 2: Frontend Integration
1. Add API calls in `services-table.jsx`
2. Add API calls in `orders-table.jsx`
3. Add error handling
4. Add loading states

### Step 3: Replace localStorage
- Replace all localStorage calls with API calls
- Add loading states
- Improve error handling

## 7. Pricing Tiers - How It Works

### Current Implementation
- Each service can have multiple pricing tiers
- Example:
  - 100 units = $2.99
  - 500 units = $9.99 (33% discount)
  - 1000 units = $15.99 (47% discount)

### How to Add/Edit
1. Open service add/edit form
2. Click "Manage Pricing" button
3. For each tier:
   - Enter quantity (e.g., 100, 500, 1000)
   - Enter price for that quantity (e.g., 2.99, 9.99)
   - Discount % (optional)
4. Click "Add New Pricing Tier" to add more tiers
5. Click "Save Pricing"
6. Save the form

### Database Storage
Pricing tiers will be stored in a separate table:
```sql
INSERT INTO pricing_tiers (service_id, quantity, price, discount) VALUES
(1, 100, 2.99, 0),
(1, 500, 9.99, 33),
(1, 1000, 15.99, 47);
```

## 8. Provider Selection - API Integration

### Current Status
- The option to manually add providers has been **removed**
- Now providers will only sync from API
- Click "Sync Providers" button to fetch latest providers from API

### API Endpoint Required
```javascript
GET /api/providers
Response: {
  "providers": [
    { "id": 1, "name": "SMMPanel", "status": "active" },
    { "id": 2, "name": "Buzzoid", "status": "active" }
  ]
}
```

## 9. Testing Checklist

- [ ] Services add/edit/delete properly save
- [ ] Pricing tiers properly save
- [ ] Providers sync from API
- [ ] Categories properly save
- [ ] Orders properly save
- [ ] Data persists on refresh

## 10. Next Steps for Real Project

1. **Backend API Development**
   - Node.js/Express or PHP/Laravel backend
   - Database setup
   - Create API endpoints

2. **Frontend Integration**
   - Replace API calls with localStorage
   - Error handling
   - Loading states

3. **Authentication**
   - JWT tokens
   - Protected routes
   - User sessions

4. **Real-time Updates**
   - WebSocket for order status
   - Real-time notifications

## Notes

- **In demo:** Everything is saved in localStorage (persists until browser refresh)
- **In real project:** Backend API + Database required
- **Pricing tiers:** Fully functional, can add unlimited tiers
- **Providers:** Will sync from API, manual add option removed
