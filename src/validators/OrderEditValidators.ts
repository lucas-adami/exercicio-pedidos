import * as Yup from "yup";

export const OrderEditValidator = () => {
  return Yup.object().shape({
    order_date: Yup.number().required("Campo Obrigatório"),
    client_document: Yup.number()
      .required("Campo Obrigatório")
      .max(11, "Campo deve ter no máximo ${max} caracteres"),
    payment_type: Yup.string().required("Campo Obrigatório"),
    quantity: Yup.number().min(0.01, "Campo deve ter o peso min ${min}"),
    total_value: Yup.number().max(
      50,
      "Campo deve ter no máximo ${max} caracteres"
    ),
  });
};
