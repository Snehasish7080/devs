import * as Yup from "yup";

export const verifyValidation = Yup.object().shape({
  otp: Yup.number().min(4).max(4).required("* Required"),
  Password: Yup.string().required("* Required"),
});
