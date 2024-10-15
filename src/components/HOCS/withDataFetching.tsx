import { useEffect, useState } from "react"; // Importa hooks do React para estado e efeitos colaterais.
import axios from "axios"; // Biblioteca para realizar requisições HTTP.
import Alert from "@mui/material/Alert"; // Componente de alerta do Material-UI para exibir mensagens de erro.
import AlertTitle from "@mui/material/AlertTitle"; // Título do componente de alerta.
import { CircularProgress } from "@mui/material"; // Componente de carregamento circular do Material-UI.

export const withDataFetching = (url: string) => (WrappedComponent: any) => {
  // Retorna um componente que envolve o componente original com a lógica de busca de dados.
  return function WithDataFetching(props: any) {
    // Declara estados para armazenar os dados, erros e status de carregamento.
    const [data, setData] = useState();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // useEffect executa uma função para buscar dados quando o componente é montado ou quando 'slug' muda.
    useEffect(() => {
      const fetchData = async () => {
        const id = props.params?.slug ? `/${props.params?.slug}` : ""; // Adiciona o 'slug' na URL se estiver presente.

        try {
          const response = await axios.get(`${url}${id}`); // Realiza a requisição GET para a URL fornecida.
          setData(response.data); // Armazena os dados recebidos no estado 'data'.
        } catch (_error) {
          setError("Erro ao tentar realizar a consulta"); // Define a mensagem de erro se a requisição falhar.
        } finally {
          setIsLoading(false); // Define como falso o estado de carregamento, independentemente do sucesso ou falha.
        }
      };

      fetchData(); // Chama a função de busca de dados.
    }, [props.params?.slug]); // O efeito é disparado quando o 'slug' muda.

    // Retorna a interface de carregamento, erro e o componente envolvido.

    return (
      <>
        {error ? (
          <Alert severity="error" variant="filled" sx={{ marginTop: "70px" }}>
            <AlertTitle>Erro</AlertTitle>
            {error}
          </Alert>
        ) : undefined}
        <WrappedComponent {...props} data={data} />;
        {isLoading ? (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "calc(100vh / 2)",
              left: "calc(100vw/2)",
            }}
          />
        ) : undefined}
      </>
    );
  };
};
