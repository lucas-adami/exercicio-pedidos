import { validatorMessage } from "@/constants/validatorMessages";
import * as Yup from "yup";

export const OrderEditValidator = () => {
  const { requiredField, numericField, minValue, length } = validatorMessage;
  return Yup.object().shape({
    order_date: Yup.string().required(requiredField).length(10, length),
    client_document: Yup.string().required(requiredField).length(11, length),
    payment_type: Yup.string().required(requiredField),
    quantity: Yup.number()
      .typeError(numericField)
      .required(requiredField)
      .min(1, minValue),
    total_value: Yup.number()
      .typeError(numericField)
      .required(requiredField)
      .min(0.01, minValue),
  });
};
