import React, { useEffect, useState } from 'react';
import useAxiosGet from '../../../hooks/usetHttpGet';
import { Product } from '../../../types/product';
import ProductsList from '../ProductsList/ProductsList';
import Loader from '../../Loader/Loader';
import { TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FilterContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  width: '300px',
  margin: '20px auto',
});

const CenteredProductsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  margin: 'auto',
});

const Products = () => {
  const { data, isLoading, isError, error } = useAxiosGet<Product[]>({
    method: 'GET',
    url: 'https://fakestoreapi.com/products',
  });

  const [nameFilter, setNameFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Product[] | null>(null);

  useEffect(() => {
    if (data) {
      const sorted = [...data].sort((a, b) => b.price - a.price);
      const filtered = sorted.filter((product) =>
        product.title.toLowerCase().includes(nameFilter.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, nameFilter]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };

  return (
    <CenteredProductsContainer>
      <FilterContainer>
        <TextField
          label="Search Product by Name"
          variant="outlined"
          value={nameFilter}
          onChange={handleNameFilterChange}
        />
      </FilterContainer>
      {filteredData && filteredData.length > 0 ? (
        <ProductsList products={filteredData} />
      ) : (
        <Typography variant="h6">No products match your search</Typography>
      )}
    </CenteredProductsContainer>
  );
};

export default Products;
