import React from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types/product';

const ProductItemContainer = styled('div')({
  border: '1px solid #ccc',
  padding: '10px',
  margin: '10px',
  height: '90%',
  width: '90%',
});

const ProductImage = styled('img')({
  width: 300,
  height: 300,
  marginBottom: '10px',
  cursor: 'pointer',
});

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <ProductItemContainer>
      <h3>{product.title}</h3>
      <ProductImage
        src={product.image}
        alt={product.title}
        onClick={handleImageClick}
      />
      <h4>${product.price}</h4>
    </ProductItemContainer>
  );
};

export default ProductItem;
