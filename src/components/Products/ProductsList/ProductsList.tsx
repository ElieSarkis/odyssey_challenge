import React, { useState } from 'react';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { Product } from '../../../types/product';
import ProductItem from '../ProductItem/ProductItem';

interface ProductsListProps {
  products: Product[] | undefined;
}

const ProductsListContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  width: '100%',
  textAlign: 'center',
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
});

const LoadMoreButton = styled(Button)({
  margin: '20px auto',
  display: 'block',
});

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const itemsPerPage = 9;

  React.useEffect(() => {
    if (products) {
      setVisibleProducts(products.slice(0, itemsPerPage));
      setCurrentIndex(itemsPerPage);
    }
  }, [products]);

  const loadMoreProducts = () => {
    if (products) {
      const nextIndex = currentIndex + itemsPerPage;
      setVisibleProducts((prevProducts) => [
        ...prevProducts,
        ...products.slice(currentIndex, nextIndex),
      ]);
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <>
      <ProductsListContainer>
        {visibleProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsListContainer>
      {currentIndex < (products?.length || 0) && (
        <LoadMoreButton variant="contained" onClick={loadMoreProducts}>
          Load More
        </LoadMoreButton>
      )}
    </>
  );
};

export default ProductsList;
