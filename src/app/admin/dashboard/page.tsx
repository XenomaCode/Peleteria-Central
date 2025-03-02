'use client';

import { useState, useEffect } from 'react';
import { database } from '@/firebase/config';
import { ref as databaseRef, get, child, onValue } from 'firebase/database';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Activity {
  type: 'product' | 'category' | 'order';
  action: string;
  timestamp: number;
  details: string;
  orderId?: string;
  status?: string;
}

interface Order {
  id: string;
  items: any[];
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: number;
  total: number;
  hasItemsWithoutPrice: boolean;
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    activeOrders: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = databaseRef(database);
        
        // Obtener productos y categorías
        const [productsSnap, categoriesSnap] = await Promise.all([
          get(child(dbRef, 'products')),
          get(child(dbRef, 'categories')),
        ]);

        // Escuchar cambios en pedidos en tiempo real
        const ordersRef = databaseRef(database, 'purchases');
        const unsubscribe = onValue(ordersRef, (snapshot) => {
          const orders = snapshot.val();
          if (orders) {
            const ordersArray = Object.entries(orders).map(([id, order]: [string, any]) => ({
              id,
              ...order,
            }));

            // Contar solo pedidos activos (pendientes y en proceso)
            const activeOrders = ordersArray.filter(
              order => order.status === 'pending' || order.status === 'processing'
            ).length;

            // Generar actividad reciente
            const recentActivities: Activity[] = ordersArray
              .sort((a, b) => b.createdAt - a.createdAt)
              .slice(0, 5)
              .map((order) => ({
                type: 'order',
                action: order.status,
                timestamp: order.createdAt,
                details: `Pedido #${order.id.slice(-6)} - ${getStatusLabel(order.status)}`,
                orderId: order.id,
                status: order.status
              }));

            setStats(prev => ({
              ...prev,
              activeOrders,
            }));

            setRecentActivity(recentActivities);
          }
        });

        // Actualizar stats de productos y categorías
        setStats(prev => ({
          ...prev,
          totalProducts: productsSnap.exists() ? Object.keys(productsSnap.val()).length : 0,
          totalCategories: categoriesSnap.exists() ? Object.keys(categoriesSnap.val()).length : 0,
        }));

        setLoading(false);

        return () => unsubscribe();
      } catch (error) {
        console.error('Error al obtener datos:', error);
        toast.error('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'Pendiente',
      processing: 'En proceso',
      completed: 'Completado',
      cancelled: 'Cancelado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-600',
      processing: 'bg-blue-100 text-blue-600',
      completed: 'bg-green-100 text-green-600',
      cancelled: 'bg-red-100 text-red-600'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'processing':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'cancelled':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
    
    if (seconds < 60) return 'hace un momento';
    if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} minutos`;
    if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)} horas`;
    
    return format(timestamp, "d 'de' MMMM 'a las' HH:mm", { locale: es });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <Link 
            href="/admin/categories"
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2"
          >
            <span>Gestionar Categorías</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/admin/products" 
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center space-x-2"
          >
            <span>Gestionar Productos</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 shadow-sm border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-700 text-sm font-medium">Total Productos</p>
              <p className="text-4xl font-bold text-amber-900 mt-2">{stats.totalProducts}</p>
            </div>
            <div className="bg-amber-500/10 p-3 rounded-full">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 shadow-sm border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-700 text-sm font-medium">Total Categorías</p>
              <p className="text-4xl font-bold text-emerald-900 mt-2">{stats.totalCategories}</p>
            </div>
            <div className="bg-emerald-500/10 p-3 rounded-full">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-sm border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 text-sm font-medium">Pedidos Activos</p>
              <p className="text-4xl font-bold text-blue-900 mt-2">{stats.activeOrders}</p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-full">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Actividad Reciente</h2>
          <div className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  activity.status ? getStatusColor(activity.status) : 'bg-gray-100 text-gray-600'
                }`}>
                  {activity.status ? getStatusIcon(activity.status) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.details}</p>
                  <p className="text-sm text-gray-500">{getTimeAgo(activity.timestamp)}</p>
                </div>
                {activity.orderId && (
                  <Link
                    href={`/admin/orders?id=${activity.orderId}`}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}

            {recentActivity.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-500">No hay actividad reciente</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 