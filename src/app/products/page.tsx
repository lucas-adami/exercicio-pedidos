"use client"; // Indica que este componente será renderizado no lado do cliente.

// Importações de componentes e bibliotecas externas.
import CustomTable from "@/components/UI/organisms/CustomTable"; // Componente de tabela personalizada para exibir dados.
import Layout from "@/components/UI/organisms/Layout"; // Componente de layout para a estrutura da página.
import { env } from "@/config/env"; // Importa variáveis de ambiente, como URLs de API.
import { Box } from "@mui/material"; // Importa o componente Box do Material-UI para estruturação da interface.
import axios from "axios"; // Biblioteca para realizar requisições HTTP.
import { useEffect, useState } from "react"; // Importa hooks para gerenciar estado e efeitos colaterais.

const Products = () => {
  // Declara um estado para armazenar os produtos (linhas da tabela).
  const [rows, setRows] = useState([]);

  // useEffect executa a função ao carregar o componente.
  useEffect(() => {
    // Função assíncrona para buscar dados dos produtos da API.
    const fetchProducts = async () => {
      const response = await axios.get(`${env.apiBaseUrl}/produtos`); // Faz uma requisição GET para obter dados dos produtos.

      // Mapeia a resposta da API para o formato necessário pela tabela.
      const products = response.data.produtos.map((product: any) => ({
        id: product.id,
        description: product.descricao,
        brand: product.marca,
        value: product.valor,
        weight: product.peso_gramas,
        flavor: product.sabor,
      }));

      setRows(products); // Atualiza o estado 'rows' com os produtos formatados.

      console.log(response.data); // Log dos dados da resposta para debug.
    };

    fetchProducts(); // Chama a função de busca de produtos ao carregar o componente.
  }, []); // O array vazio como segundo argumento garante que a busca ocorra apenas na montagem do componente.

  // Define as colunas (cabeçalhos) da tabela, especificando identificadores e rótulos.
  const headCells = [
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: "Descrição",
    },
    {
      id: "brand",
      numeric: false,
      disablePadding: false,
      label: "Marca",
    },
    {
      id: "value",
      numeric: true,
      disablePadding: false,
      label: "Valor",
    },
    {
      id: "weight",
      numeric: true,
      disablePadding: false,
      label: "Peso",
    },
    {
      id: "flavor",
      numeric: false,
      disablePadding: false,
      label: "Sabor",
    },
  ];

  // Renderiza o componente Layout e a tabela com dados dos produtos.

  return (
    <Layout>
      <Box data-testid="productList"> Lista de Produtos </Box>
      <CustomTable
        rows={rows}
        headCells={headCells}
        editPath="/products/edit"
      />
    </Layout>
  );
};

export default Products; // Exporta o componente para ser utilizado em outras partes do aplicativo.
