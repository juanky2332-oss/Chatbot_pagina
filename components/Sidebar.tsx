import React from 'react';

const Sidebar: React.FC = () => {
  const categories = [
    'Rodamientos',
    'Soportes',
    'Retenes',
    'Correas',
    'Cadenas',
    'Accesorios'
  ];

  return (
    <aside className="w-64 flex-shrink-0 hidden md:block pr-6">
      {/* Categories */}
      <div className="mb-8 border border-gray-200 bg-white">
        <div className="bg-gray-100 p-3 font-bold text-gray-700 text-sm border-b border-gray-200">
            PRODUCTOS
        </div>
        <ul>
          {categories.map((cat, idx) => (
            <li key={idx} className="border-b border-gray-100 last:border-0">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 flex justify-between items-center group">
                {cat}
                <span className="text-gray-400 group-hover:text-sky-600 text-lg">+</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Filters */}
      <div className="border border-gray-200 bg-white p-4">
        <h3 className="font-bold text-gray-700 text-sm mb-4 uppercase">Filtrar Por</h3>
        
        <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Precio</h4>
            <div className="text-sm text-gray-600 mb-2">0,00 € - 32.000,00 €</div>
            <div className="h-1 bg-gray-200 rounded-full relative">
                <div className="absolute left-0 w-1/3 h-full bg-gray-800 rounded-full"></div>
                <div className="absolute left-1/3 w-3 h-3 bg-white border-2 border-gray-800 rounded-full -top-1"></div>
                <div className="absolute right-0 w-3 h-3 bg-white border-2 border-gray-800 rounded-full -top-1"></div>
            </div>
        </div>

        <div>
            <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">Categorías</h4>
            {categories.slice(0, 4).map((cat, i) => (
                <label key={i} className="flex items-center gap-2 mb-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-sky-600 focus:ring-sky-500" />
                    {cat}
                </label>
            ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;