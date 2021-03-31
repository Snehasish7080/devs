import * as Yup from "yup";

export const reportValidation = Yup.object().shape({
  title: Yup.string().required("* Required"),
  report: Yup.string().required("* Required"),
});
