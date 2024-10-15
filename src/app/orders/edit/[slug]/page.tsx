"use client"; // Indica que este componente é renderizado no lado do cliente.

// Importação de componentes e dependências.
import EditTemplate from "@/components/templates/order/EditTemplate"; // Componente de template de edição do pedido.
import { useEffect, useState } from "react"; // Hooks do React para gerenciamento de estado e efeitos colaterais.
import { env } from "@/config/env"; // Importa variáveis de ambiente, como URLs de API.
import { IOrders } from "@/interfaces/IOrders"; // Interface que define a estrutura de dados de um pedido.
import { withDataFetching } from "@/components/HOCS/withDataFetching"; // HOC para adicionar a funcionalidade de busca de dados.

// Define as propriedades que o componente espera receber.
interface OrderEditProps {
  params?: { slug: string }; // Parâmetro opcional para identificar o pedido (por exemplo, ID ou slug).
  data: any; // Dados a serem editados, passados pelo HOC.
}

const OrderEdit: React.FC<OrderEditProps> = ({ params, data }) => {
  // Declara um estado para armazenar os dados do pedido.
  const [order, setOrder] = useState<IOrders>();

  // useEffect executa a função sempre que 'data' for alterado.
  useEffect(() => {
    if (!data) return; // Se não houver dados, a função não é executada.

    // Função assíncrona para mapear os dados recebidos no formato esperado pelo template.
    const fetchData = async () => {
      const {
        id,
        dia_pedido: order_date,
        cpf: client_document,
        forma_pagamento: payment_type,
        quantidade_itens: quantity,
        valor_total: total_value,
      } = data.pedido; // Desestrutura os dados do pedido.

      setOrder({
        id,
        order_date,
        client_document,
        payment_type,
        quantity,
        total_value,
      }); // Atualiza o estado 'order' com os dados do pedido formatados.
    };

    fetchData(); // Chama a função para atualizar o estado com os dados.
  }, [data]); // O efeito é disparado quando 'data' muda.

  // Renderiza o template de edição com os dados do pedido.
  return <EditTemplate order={order} />;
};

// Exporta o componente com o HOC, que injeta os dados do pedido vindos da API.
export default withDataFetching(`${env.apiBaseUrl}/pedido`)(OrderEdit);
