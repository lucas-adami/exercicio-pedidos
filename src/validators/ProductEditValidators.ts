import { validatorMessage } from "@/constants/validatorMessages";
import * as Yup from "yup";

export const ProductEditValidator = () => {
  const { requiredField, numericField, minValue, minLenght, maxLength } =
    validatorMessage;
  return Yup.object().shape({
    description: Yup.string()
      .required(requiredField)
      .min(3, minLenght)
      .max(100, maxLength),
    brand: Yup.string().required(requiredField).max(80),
    value: Yup.number()
      .typeError(numericField)
      .required(validatorMessage)
      .min(0.01, minValue),
    weight: Yup.number().min(0.01, minValue).typeError(numericField),
    flavor: Yup.string().max(50),
  });
};
