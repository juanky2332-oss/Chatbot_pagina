import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import ChatWidget from './components/ChatWidget';
import { MOCK_PRODUCTS } from './constants';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-800">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6 flex gap-6">
        <Sidebar />
        
        <div className="flex-1 flex flex-col gap-6">
          {/* Product Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-4">
             <div>
                 <h2 className="text-2xl font-bold text-gray-900">Catálogo de Productos</h2>
                 <p className="text-sm text-gray-500 mt-1">Transmisión de Potencia - Referencias en Stock</p>
             </div>
             
             <div className="flex items-center gap-2 mt-4 md:mt-0">
                <span className="text-sm text-gray-600 font-medium">Ordenar por:</span>
                <select className="bg-white border-gray-300 border rounded py-1.5 px-3 text-sm focus:ring-gray-500 focus:border-gray-500">
                    <option>Relevancia</option>
                    <option>Precio: Menor a Mayor</option>
                    <option>Precio: Mayor a Menor</option>
                </select>
             </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto py-8 px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                {/* CAMBIO AQUÍ: Nombre actualizado a Flownexion */}
                <p>&copy; {new Date().getFullYear()} Flownexion - Plataforma B2B.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gray-900">Aviso Legal</a>
                    <a href="#" className="hover:text-gray-900">Política de Privacidad</a>
                    <a href="#" className="hover:text-gray-900">Contacto</a>
                </div>
            </div>
        </div>
      </footer>

      {/* Controlled Chat Widget - The main feature */}
      <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default App;
