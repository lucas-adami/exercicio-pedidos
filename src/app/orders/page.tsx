"use client";

import CustomTable from "@/components/UI/organisms/CustomTable";
import Layout from "@/components/UI/organisms/Layout";
import { env } from "@/config/env";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`${env.apiBaseUrl}/pedidos`);

      const orders = response.data.pedidos.map((order: any) => ({
        id: order.id,
        order_date: order.dia_pedido,
        client_document: order.cpf,
        payment_type: order.forma_pagamento,
        quantity: order.quantidade_itens,
        total_value: order.valor_total,
      }));

      setRows(orders);

      console.log(response.data);
    };
    fetchOrders();
  }, []);

  const headCells = [
    {
      id: "order_date",
      numeric: true,
      disablePadding: false,
      label: "Data do pedido",
    },
    {
      id: "client_document",
      numeric: true,
      disablePadding: false,
      label: "CPF",
    },
    {
      id: "payment_type",
      numeric: false,
      disablePadding: false,
      label: "Forma de pagamento",
    },
    {
      id: "quantity",
      numeric: true,
      disablePadding: false,
      label: "Quantidade",
    },
    {
      id: "total_value",
      numeric: true,
      disablePadding: false,
      label: "Valor",
    },
  ];

  return (
    <Layout>
      <Box> Lista de Pedidos </Box>
      <CustomTable rows={rows} headCells={headCells} />
    </Layout>
  );
};

export default Orders;
