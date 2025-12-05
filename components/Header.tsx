import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white py-4 px-6 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        {/* Top Mini Bar (Simulated) */}
        <div className="absolute top-0 right-0 p-2 text-xs text-gray-400 hidden md:flex gap-4">
            <span>Mi cuenta</span>
            <span>Cerrar sesión</span>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold tracking-tighter">
            <span className="text-gray-300">ES</span>
            <span className="text-white">GAS</span>
          </div>
          <div className="text-[0.6rem] leading-tight text-sky-500 uppercase font-semibold hidden sm:block">
            Business To Business<br/>Platform
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition-colors">INICIO</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            PRODUCTOS
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </a>
          <a href="#" className="hover:text-white transition-colors">CONTACTO</a>
        </nav>

        {/* Search & Cart */}
        <div className="flex items-center gap-4 text-gray-300">
            <button className="hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <button className="hover:text-white relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                <span className="absolute -top-2 -right-2 bg-sky-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;