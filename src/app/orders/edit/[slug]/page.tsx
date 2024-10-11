"use client";

import EditTemplate from "@/components/templates/order/EditTemplate";
import { useEffect, useState } from "react";
import { env } from "@/config/env";
import { IOrders } from "@/interfaces/IOrders";
import { withDataFetching } from "@/components/HOCS/withDataFetching";

interface OrderEditProps {
  params?: { slug: string };
  data: any;
}

const OrderEdit: React.FC<OrderEditProps> = ({ params, data }) => {
  const [order, setOrder] = useState<IOrders>();
  useEffect(() => {
    if (!data) return;
    const fetchData = async () => {
      const {
        id,
        dia_pedido: order_date,
        cpf: client_document,
        forma_pagamento: payment_type,
        quantidade_itens: quantity,
        valor_total: total_value,
      } = data.pedido;

      setOrder({
        id,
        order_date,
        client_document,
        payment_type,
        quantity,
        total_value,
      });
    };

    fetchData();
  }, [data]);
  return <EditTemplate order={order} />;
};

export default withDataFetching(`${env.apiBaseUrl}/pedido`)(OrderEdit);
