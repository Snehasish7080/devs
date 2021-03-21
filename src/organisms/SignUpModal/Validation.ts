import * as Yup from "yup";

export const signUpValidation = Yup.object().shape({
  Username: Yup.string().required("* Required"),
  Email: Yup.string().email("* Must be a valid email").required("* Required"),
  Password: Yup.string().required("* Required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "* Passwords must match")
    .required("* Required"),
});
