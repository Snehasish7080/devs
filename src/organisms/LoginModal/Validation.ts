import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  Username: Yup.string().required("* Required"),
  Password: Yup.string().required("* Required"),
});
