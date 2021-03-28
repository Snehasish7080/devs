import * as Yup from "yup";

export const verifyValidation = Yup.object().shape({
  otp: Yup.number()
    .test(
      "len",
      "Must be exactly 4 characters",
      (val) => val?.toString().length === 4
    )
    .required("* Required"),
});
