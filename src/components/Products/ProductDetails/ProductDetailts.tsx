import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Product } from '../../../types/product';

const Container = styled('div')({
  textAlign: 'center',
});

const ProductImage = styled('img')({
  width: 300,
  height: 300,
  marginBottom: '10px',
  cursor: 'pointer',
  '@media (min-width: 768px)': {
    width: 600,
    height: 600,
  },
});

const DescriptionText = styled('p')({
  fontWeight: 'bold',
  width: '50%',
  margin: '0 auto',
});

const GoBackButton = styled(Link)({
  display: 'block',
  margin: '20px auto',
  padding: '10px 20px',
  backgroundColor: '#ccc',
  textDecoration: 'none',
  color: '#000',
  fontWeight: 'bold',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '25%',
  '@media (min-width: 768px)': {
    width: '10%',
  },
});

const ProductDetails: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product as Product;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container>
      <h1>{product.title}</h1>
      <ProductImage src={product.image} alt={product.title} />
      <DescriptionText>{product.description}</DescriptionText>
      <p>${product.price}</p>
      <p>Rating: {product.rating.rate}</p>
      <GoBackButton to="/">Go Back</GoBackButton>
    </Container>
  );
};

export default ProductDetails;
