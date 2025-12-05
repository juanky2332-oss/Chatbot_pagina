import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 p-4 flex flex-col group hover:shadow-lg transition-shadow">
      <div className="relative mb-4">
        {/* Badges */}
        <div className="absolute top-0 left-0 flex flex-col gap-1">
            {product.stock === 0 && (
                <span className="bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5">AGOTADO</span>
            )}
        </div>
        {product.badge && (
             <span className="absolute top-0 right-0 bg-sky-500 text-white text-[10px] font-bold px-2 py-0.5">{product.badge}</span>
        )}
        
        {/* Image */}
        <div className="aspect-square w-full flex items-center justify-center overflow-hidden">
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
            />
        </div>
      </div>

      {/* Info */}
      <div className="mt-auto text-center">
        <h3 className="text-sm font-bold text-gray-800 mb-1 leading-tight min-h-[2.5em]">{product.name}</h3>
        <div className="flex justify-center items-center gap-2 mb-2">
            <span className="text-sky-600 font-bold text-lg">
                {product.price.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
            </span>
            {product.originalPrice && (
                <span className="text-gray-400 text-xs line-through decoration-1">
                    {product.originalPrice.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;