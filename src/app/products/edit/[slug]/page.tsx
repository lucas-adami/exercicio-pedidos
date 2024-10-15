"use client"; // Indica que este componente será renderizado no lado do cliente.

// Importação de componentes e dependências.
import EditTemplate from "@/components/templates/product/EditTemplate"; // Componente de template de edição do produto.
import { useEffect, useState } from "react"; // Hooks do React para gerenciamento de estado e efeitos colaterais.
import { env } from "@/config/env"; // Importa variáveis de ambiente, como URLs de API.
import { IProducts } from "@/interfaces/IProducts"; // Interface que define a estrutura de dados de um produto.
import { withDataFetching } from "@/components/HOCS/withDataFetching"; // HOC para adicionar a funcionalidade de busca de dados.

// Define as propriedades que o componente espera receber.
interface ProductEditProps {
  params?: { slug: string }; // Parâmetro opcional para identificar o produto (por exemplo, ID ou slug).
  data: any; // Dados a serem editados, passados pelo HOC.
}

const ProductEdit: React.FC<ProductEditProps> = ({ params, data }) => {
  // Declara um estado para armazenar os dados do produto.
  const [product, setProduct] = useState<IProducts>();

  // useEffect executa a função sempre que 'data' for alterado.
  useEffect(() => {
    if (!data) return; // Se não houver dados, a função não é executada.

    // Função assíncrona para mapear os dados recebidos no formato esperado pelo template.
    const fetchData = async () => {
      const {
        id,
        marca: brand,
        descricao: description,
        sabor: flavor,
        valor: value,
        peso_gramas: weight,
      } = data.produto; // Desestrutura os dados do produto.

      setProduct({
        id,
        brand,
        description,
        flavor,
        value,
        weight,
      }); // Atualiza o estado 'product' com os dados do produto formatados.
    };

    fetchData(); // Chama a função para atualizar o estado com os dados.
  }, [data]); // O efeito é disparado quando 'data' muda.

  // Renderiza o template de edição com os dados do produto.
  return <EditTemplate product={product} />;
};

// Exporta o componente com o HOC, que injeta os dados do produto vindos da API.
export default withDataFetching(`${env.apiBaseUrl}/produto`)(ProductEdit);
