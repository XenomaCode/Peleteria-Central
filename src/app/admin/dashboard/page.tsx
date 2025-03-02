'use client';

import { useState, useEffect } from 'react';
import { database } from '@/firebase/config';
import { ref as databaseRef, get } from 'firebase/database';
import CategoryModal from '@/components/modals/CategoryModal';
import ProductModal from '@/components/modals/ProductModal';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
  });
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
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
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        toast.error('Error al cargar las estadísticas');
      }
    };

    fetchStats();
  }, [isCategoryModalOpen, isProductModalOpen]); // Actualizar cuando se cierre cualquier modal

  const statCards = [
    {
      title: 'Total Productos',
      value: stats.totalProducts,
      icon: (
        <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Categorías',
      value: stats.totalCategories,
      icon: (
        <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Pedidos',
      value: stats.totalOrders,
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Nueva Categoría</span>
          </button>
          <button
            onClick={() => setIsProductModalOpen(true)}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} p-6 rounded-xl shadow-sm border border-gray-100 transition-transform hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-gray-600">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
              </div>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">Actividad Reciente</h2>
          <div className="mt-4 space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0 ? 'bg-green-100' : index === 1 ? 'bg-blue-100' : 'bg-amber-100'}`}>
                    <svg className={`w-6 h-6 ${index === 0 ? 'text-green-600' : index === 1 ? 'text-blue-600' : 'text-amber-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {index === 0 ? 'Nuevo producto agregado' : index === 1 ? 'Categoría actualizada' : 'Pedido completado'}
                    </p>
                    <p className="text-sm text-gray-500">Hace {index + 1} {index === 0 ? 'minuto' : 'minutos'}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modales */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
    </div>
  );
} 