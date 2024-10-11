"use client";

import EditTemplate from "@/components/templates/product/EditTemplate";
import { useEffect, useState } from "react";
import { env } from "@/config/env";
import { IProducts } from "@/interfaces/IProducts";
import { withDataFetching } from "@/components/HOCS/withDataFetching";

interface ProductEditProps {
  params?: { slug: string };
  data: any;
}

const ProductEdit: React.FC<ProductEditProps> = ({ params, data }) => {
  const [product, setProduct] = useState<IProducts>();

  useEffect(() => {
    if (!data) return;
    const fetchData = async () => {
      const {
        id,
        marca: brand,
        descricao: description,
        sabor: flavor,
        valor: value,
        peso_gramas: weight,
      } = data.produto;

      setProduct({
        id,
        brand,
        description,
        flavor,
        value,
        weight,
      });
    };

    fetchData();
  }, [data]);
  return <EditTemplate product={product} />;
};

export default withDataFetching(`${env.apiBaseUrl}/produto`)(ProductEdit);
