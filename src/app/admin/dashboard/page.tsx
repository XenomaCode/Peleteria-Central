'use client';

import { useState, useEffect } from 'react';
import { database } from '@/firebase/config';
import { ref as databaseRef, get, child } from 'firebase/database';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface Activity {
  type: 'product' | 'category' | 'order';
  action: string;
  timestamp: number;
  details: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = databaseRef(database);
        const [productsSnap, categoriesSnap, ordersSnap] = await Promise.all([
          get(child(dbRef, 'products')),
          get(child(dbRef, 'categories')),
          get(child(dbRef, 'orders'))
        ]);

        setStats({
          totalProducts: productsSnap.exists() ? Object.keys(productsSnap.val()).length : 0,
          totalCategories: categoriesSnap.exists() ? Object.keys(categoriesSnap.val()).length : 0,
          totalOrders: ordersSnap.exists() ? Object.keys(ordersSnap.val()).length : 0,
        });

        // Simular actividad reciente (esto debería venir de tu base de datos)
        setRecentActivity([
          {
            type: 'product',
            action: 'created',
            timestamp: Date.now() - 60000,
            details: 'Nuevo producto agregado'
          },
          {
            type: 'category',
            action: 'updated',
            timestamp: Date.now() - 120000,
            details: 'Categoría actualizada'
          },
          {
            type: 'order',
            action: 'completed',
            timestamp: Date.now() - 180000,
            details: 'Pedido completado'
          }
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        toast.error('Error al cargar los datos');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'hace un momento';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    return 'hace más de un día';
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
              <p className="text-blue-700 text-sm font-medium">Total Pedidos</p>
              <p className="text-4xl font-bold text-blue-900 mt-2">{stats.totalOrders}</p>
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
                  activity.type === 'product' ? 'bg-amber-100 text-amber-600' :
                  activity.type === 'category' ? 'bg-emerald-100 text-emerald-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {activity.type === 'product' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  ) : activity.type === 'category' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.details}</p>
                  <p className="text-sm text-gray-500">{getTimeAgo(activity.timestamp)}</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 