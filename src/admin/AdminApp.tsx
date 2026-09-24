import React, { useState, useEffect } from 'react';
import { isAdminAuthenticated, logoutAdmin } from './auth';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminCustomers } from './AdminCustomers';
import { AdminSettings } from './AdminSettings';
import { INITIAL_ORDERS, AdminOrder } from './adminData';
import { getCatalogProducts, saveCatalogProducts } from '../data/products';
import { Product } from '../types';

interface AdminAppProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ currentPath, onNavigate }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());
  const [products, setProducts] = useState<Product[]>(() => getCatalogProducts());
  const [orders, setOrders] = useState<AdminOrder[]>(() => {
    try {
      const saved = localStorage.getItem('beautifo_admin_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load admin orders', e);
    }
    return INITIAL_ORDERS;
  });

  // Keep authenticated state in sync if session changes
  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, [currentPath]);

  // Keep products in sync with catalog events
  useEffect(() => {
    const handleCatalogUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Product[]>;
      if (customEvent.detail) {
        setProducts(customEvent.detail);
      } else {
        setProducts(getCatalogProducts());
      }
    };

    window.addEventListener('beautifo_catalog_updated', handleCatalogUpdate);
    return () => {
      window.removeEventListener('beautifo_catalog_updated', handleCatalogUpdate);
    };
  }, []);

  // Product CRUD handlers
  const handleAddProduct = (newProduct: Product) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveCatalogProducts(updated);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    setProducts(updated);
    saveCatalogProducts(updated);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    saveCatalogProducts(updated);
  };

  // Persist order status updates
  const handleUpdateOrderStatus = (orderId: string, newStatus: AdminOrder['status']) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      try {
        localStorage.setItem('beautifo_admin_orders', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save orders', e);
      }
      return updated;
    });
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    onNavigate('/admin/dashboard');
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    onNavigate('/admin');
  };

  // If user is not authenticated, always show AdminLogin
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onReturnToStore={() => onNavigate('/')}
      />
    );
  }

  // Normalize path
  const normalizedPath = currentPath.replace(/\/$/, '') || '/admin';

  // Automatically transition bare /admin to /admin/dashboard once authenticated
  useEffect(() => {
    if (isAuthenticated && (normalizedPath === '/admin')) {
      onNavigate('/admin/dashboard');
    }
  }, [isAuthenticated, normalizedPath, onNavigate]);

  // Render appropriate view based on path
  const renderView = () => {
    switch (normalizedPath) {
      case '/admin/products':
        return (
          <AdminProducts
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      case '/admin/orders':
        return (
          <AdminOrders
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        );
      case '/admin/customers':
        return <AdminCustomers />;
      case '/admin/settings':
        return <AdminSettings />;
      case '/admin':
      case '/admin/dashboard':
      default:
        return (
          <AdminDashboard
            products={products}
            orders={orders}
            onNavigate={onNavigate}
          />
        );
    }
  };

  return (
    <AdminLayout
      currentPath={normalizedPath}
      onNavigate={onNavigate}
      onLogout={handleLogout}
    >
      {renderView()}
    </AdminLayout>
  );
};
