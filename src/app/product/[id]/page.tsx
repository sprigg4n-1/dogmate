import React from 'react';
import ProductSection from '@/components/shop/ProductSection';

import { getProductsById } from '@/services/ShopService';

const ProductPage = async ({ params }: { params: any }) => {
  const id = await params.id;

  const prdcts = await getProductsById(id);

  return (
    <>
      <ProductSection product={prdcts} />
    </>
  );
};

export default ProductPage;
