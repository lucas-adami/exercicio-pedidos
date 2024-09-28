"use client";

import EditTemplate from "@/components/templates/product/EditTemplate";

interface ProductEditProps {
  params: { slug: string };
}

const ProductEdit: React.FC<ProductEditProps> = ({ params }) => {
  //<div>{params.slug}</div>
  return <EditTemplate />;
};

export default ProductEdit;
