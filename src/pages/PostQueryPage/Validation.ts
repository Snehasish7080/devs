import * as Yup from "yup";

export const postQueryValidation = Yup.object().shape({
  title: Yup.string().required("* Required"),
  amount: Yup.number().min(10).required("* Required"),
  averageResTime: Yup.number().min(1).required("* Required"),
  averageTriageTime: Yup.number().min(1).required("* Required"),
  description: Yup.string().required("* Required"),
});
