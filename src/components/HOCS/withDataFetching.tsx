import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { CircularProgress } from "@mui/material";

export const withDataFetching = (url: string) => (WrappedComponent: any) => {
  return function WithDataFetching(props: any) {
    const [data, setData] = useState();
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchData = async () => {
        const id = props.params?.slug ? `/${props.params?.slug}` : "";

        try {
          const response = await axios.get(`${url}${id}`);
          setData(response.data);
        } catch (_error) {
          setError("Erro ao tentar realizar a consulta");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, [props.params?.slug]);

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
