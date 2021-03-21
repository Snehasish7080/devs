import * as Yup from "yup";

export const reportValidation = Yup.object().shape({
  report: Yup.string().required("* Required"),
});
