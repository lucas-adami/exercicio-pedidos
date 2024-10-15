"use client"; // Indica que este componente será renderizado no lado do cliente.

// Importação de componentes e dependências.
import Layout from "@/components/UI/organisms/Layout"; // Componente de layout que estrutura a página.
import { IOrders } from "@/interfaces/IOrders"; // Interface para definir a estrutura dos dados de um pedido.
import { OrderEditValidator } from "@/validators/OrderEditValidators"; // Esquema de validação para o formulário.
import { Box, Button, MenuItem, Select, TextField } from "@mui/material"; // Componentes de UI do Material-UI.
import { useFormik } from "formik"; // Hook para gerenciar formulários e validações.
import React, { useEffect } from "react";

// Define as propriedades que o componente espera receber.
interface EditTemplateProps {
  order?: IOrders; // O pedido a ser editado, opcional.
}

const EditTemplate: React.FC<EditTemplateProps> = ({ order }) => {
  // Inicializa o Formik com os valores iniciais, o esquema de validação e a função de submissão.
  const formik = useFormik<IOrders>({
    initialValues: {
      order_date: "",
      client_document: "",
      payment_type: "",
      quantity: 0,
      total_value: 0,
    },

    validationSchema: OrderEditValidator, // Valida os campos do formulário com o esquema especificado.

    onSubmit: (values) => {
      console.log(values); // Exibe os valores do formulário no console ao submeter.
    },
  });

  // Desestruturações para facilitar o uso dos métodos e propriedades do Formik.
  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    errors,
    setValues,
  } = formik;

  // useEffect executa a função sempre que 'order' muda.
  useEffect(() => {
    if (!order) return; // Se não houver pedido, não faz nada.

    const { id, ...ord } = order; // Desestrutura o pedido, excluindo o 'id'.
    setValues(ord); // Atualiza os valores do formulário com os dados do pedido.
  }, [order, setValues]); // Dispara o efeito quando 'order' ou 'setValues' mudam.

  // Renderiza o formulário com campos e botões de ação.
  return (
    <Layout>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="order_date"
          label="Data do pedido"
          fullWidth
          value={values.order_date}
          onChange={handleChange}
          error={!!errors.order_date}
          helperText={errors.order_date}
        />
        <TextField
          name="client_document"
          label="CPF"
          fullWidth
          value={values.client_document}
          onChange={handleChange}
          error={!!errors.client_document}
          helperText={errors.client_document}
        />
        <Select
          name="payment_type"
          label="Tipo de Pagamento"
          fullWidth
          value={values.payment_type}
          onChange={(e) => setFieldValue("payment_type", e.target.value)}
          error={!!errors.payment_type}
        >
          {/* Opções de tipo de pagamento */}
          <MenuItem value="vista">A vista</MenuItem>
          <MenuItem value="prazo">A prazo</MenuItem>
          <MenuItem value="pix">No pix</MenuItem>
          <MenuItem value="">Não informado</MenuItem>
        </Select>

        <TextField
          name="quantity"
          label="Quantidade"
          fullWidth
          value={values.quantity}
          onChange={handleChange}
          error={!!errors.quantity}
          helperText={errors.quantity}
        />
        <TextField
          name="total_value"
          label="Valor total do pedido"
          fullWidth
          value={values.total_value}
          onChange={handleChange}
          error={!!errors.total_value}
          helperText={errors.total_value}
        />
        <Button variant="outlined" color="secondary">
          Cancelar
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Atualizar
        </Button>
      </Box>
    </Layout>
  );
};

export default EditTemplate; // Exporta o componente para uso em outras partes da aplicação.
