import React from 'react';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { mockPubSub } from '../../../shared/lib/mockPubSub';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  imageUrl: string;
  isSoldOut?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulate Pub/Sub event
    mockPubSub.publish('CART_ITEM_ADDED', product);
  };

  return (
    <Card hoverable className="h-full flex flex-col group relative">
      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center relative overflow-hidden">
        {/* Placeholder for real image */}
        <span className="text-gray-400 text-sm">Image: {product.name}</span>
        
        {product.isSoldOut && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-full text-black font-bold text-sm">일시품절</span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold text-gray-500 mb-1">{product.brand}</span>
        <h3 className="text-sm font-medium text-[var(--color-text-main)] mb-2 line-clamp-2 h-10 group-hover:text-[var(--color-primary)] transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-baseline space-x-2">
            {product.discountRate && (
              <span className="text-lg font-bold text-red-500">{product.discountRate}%</span>
            )}
            <span className="text-lg font-bold">
              {product.price.toLocaleString()}원
            </span>
          </div>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {product.originalPrice.toLocaleString()}원
            </span>
          )}
        </div>

        <Button 
          variant="outline" 
          fullWidth 
          className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
          disabled={product.isSoldOut}
          onClick={handleAddToCart}
        >
          장바구니 담기
        </Button>
      </div>
    </Card>
  );
};
