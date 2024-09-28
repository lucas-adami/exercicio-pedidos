import * as Yup from "yup";

export const ProductEditValidator = () => {
  return Yup.object().shape({
    description: Yup.string()
      .required("Campo Obrigatório")
      .min(3, "Campo deve ter pelo menos ${min} caracteres")
      .max(100, "Campo deve ter no máximo ${max} caracteres"),
    brand: Yup.string()
      .required("Campo Obrigatório")
      .max(80, "Campo deve ter no máximo ${max} caracteres"),
    value: Yup.number()
      .required("Campo Obrigatório")
      .min(0.01, "Campo deve ter pelo menos o valor min ${min}"),
    weight: Yup.number().min(0.01, "Campo deve ter o peso min ${min}"),
    flavor: Yup.string().max(50, "Campo deve ter no máximo ${max} caracteres"),
  });
};
