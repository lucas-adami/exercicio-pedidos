"use client"; // Indica que este é um componente que deve ser renderizado no cliente.

// Importações de componentes e bibliotecas externas.
import CustomTable from "@/components/UI/organisms/CustomTable"; // Componente personalizado de tabela para exibir dados.
import Layout from "@/components/UI/organisms/Layout"; // Componente de layout para a estrutura da página.
import { env } from "@/config/env"; // Importa variáveis de ambiente, como URLs de API.
import { Box } from "@mui/material"; // Importa o componente Box do Material-UI para estruturação da interface.
import axios from "axios"; // Biblioteca para fazer requisições HTTP.
import { useEffect, useState } from "react"; // Importa hooks para gerenciar estado e efeitos colaterais.

const Orders = () => {
  // Declara um estado para armazenar os pedidos (linhas da tabela).
  const [rows, setRows] = useState([]);

  // useEffect executa uma função ao carregar o componente.
  useEffect(() => {
    // Função assíncrona para buscar dados de pedidos da API.
    const fetchOrders = async () => {
      const response = await axios.get(`${env.apiBaseUrl}/pedidos`); // Faz uma requisição GET para obter dados dos pedidos.

      // Mapeia a resposta da API para o formato necessário pela tabela.
      const orders = response.data.pedidos.map((order: any) => ({
        id: order.id,
        order_date: order.dia_pedido,
        client_document: order.cpf,
        payment_type: order.forma_pagamento,
        quantity: order.quantidade_itens,
        total_value: order.valor_total,
      }));

      setRows(orders); // Atualiza o estado 'rows' com os pedidos formatados.

      console.log(response.data); // Log dos dados da resposta para debug.
    };

    fetchOrders(); // Chama a função de busca de pedidos ao carregar o componente.
  }, []); // O array vazio como segundo argumento garante que a busca ocorra apenas na montagem do componente.

  // Define as colunas (cabeçalhos) da tabela, especificando identificadores e rótulos.
  const headCells = [
    {
      id: "order_date",
      numeric: false,
      disablePadding: false,
      label: "Data do pedido",
    },
    {
      id: "client_document",
      numeric: false,
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

  // Renderiza o componente Layout e a tabela com dados dos pedidos.

  return (
    <Layout>
      <Box> Lista de Pedidos </Box>
      <CustomTable rows={rows} headCells={headCells} editPath="/orders/edit" />
    </Layout>
  );
};

export default Orders; // Exporta o componente para ser utilizado em outras partes do aplicativo.
