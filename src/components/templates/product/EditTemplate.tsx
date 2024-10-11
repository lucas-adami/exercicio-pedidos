"use client";
import Layout from "@/components/UI/organisms/Layout";
import { IProducts } from "@/interfaces/IProducts";
import { ProductEditValidator } from "@/validators/ProductEditValidators";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";

interface EditTemplateProps {
  product?: IProducts;
}

const EditTemplate: React.FC<EditTemplateProps> = ({ product }) => {
  //<div>{params.slug}</div>

  const formik = useFormik<IProducts>({
    initialValues: {
      brand: "",
      description: "",
      flavor: "",
      value: 0,
      weight: 0,
    },

    validationSchema: ProductEditValidator,

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const {
    handleSubmit,
    values,
    handleChange,
    setFieldValue,
    errors,
    setValues,
  } = formik;

  useEffect(() => {
    if (!product) return;

    const { id, ...prod } = product;
    setValues(prod);
  }, [product, setValues]);

  return (
    <Layout>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="description"
          label="Descrição"
          fullWidth
          value={values.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          name="brand"
          label="Marca"
          fullWidth
          value={values.brand}
          onChange={handleChange}
          error={!!errors.brand}
          helperText={errors.brand}
        />
        <TextField
          name="value"
          label="Valor"
          fullWidth
          value={values.value}
          onChange={handleChange}
          error={!!errors.value}
          helperText={errors.value}
        />
        <TextField
          name="weight"
          label="Peso (gr.)"
          fullWidth
          value={values.weight}
          onChange={handleChange}
          error={!!errors.weight}
          helperText={errors.weight}
        />
        <Select
          name="flavor"
          label="Sabor"
          fullWidth
          value={values.flavor}
          onChange={(e) => setFieldValue("flavor", e.target.value)}
          error={!!errors.flavor}
        >
          <MenuItem value="morango">Morango</MenuItem>
          <MenuItem value="chocolate">Chocolate</MenuItem>
          <MenuItem value="abacaxi">Abacaxi</MenuItem>
          <MenuItem value="">Não informado</MenuItem>
        </Select>
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
