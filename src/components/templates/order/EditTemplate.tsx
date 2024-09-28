"use client";
import Layout from "@/components/UI/organisms/Layout";
import { IOrders } from "@/interfaces/IOrders";
import { OrderEditValidator } from "@/validators/OrderEditValidators";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

interface EditTemplateProps {
  params: { slug: string };
}

const EditTemplate: React.FC = () => {
  //<div>{params.slug}</div>

  const formik = useFormik<IOrders>({
    initialValues: {
      order_date: 0,
      client_document: 0,
      payment_type: "",
      quantity: 0,
      total_value: 0,
    },

    validationSchema: OrderEditValidator,

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { handleSubmit, values, handleChange, setFieldValue, errors } = formik;

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
          onChange={(e) => setFieldValue("flavor", e.target.value)}
          error={!!errors.payment_type}
        >
          <MenuItem value="a vista">A vista</MenuItem>
          <MenuItem value="a prazo">A prazo</MenuItem>
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
export default EditTemplate;
