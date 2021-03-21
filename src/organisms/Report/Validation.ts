import * as Yup from "yup";

export const replyValidation = Yup.object().shape({
  message: Yup.string().required("* Required"),
});
