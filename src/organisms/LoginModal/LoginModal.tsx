import React from "react";
import styles from "./LoginModal.module.scss";
import { Modal } from "react-bootstrap";
import IconInput from "../../molecules/IconInput/IconInput";
import UserIcon from "../../assets/images/UserIcon.svg";
import LockIcon from "../../assets/images/LockIcon.svg";
import Button from "../../atoms/Button/Button";
import { useFormik } from "formik";
import Error from "../../molecules/Error/Error";
import { loginValidation } from "./Validation";
import { login } from "../../api/Login";
import { ApiResponse } from "apisauce";
import useLocalStorage from "react-use-localstorage";

type LoginModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  openSignUp: () => void;
};

function LoginModal({ isModalOpen, closeModal, openSignUp }: LoginModalProps) {
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");

  const formik = useFormik({
    initialValues: {
      Username: "",
      Password: "",
      ServerError: "",
    },
    validationSchema: loginValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      userLogin();
    },
  });

  const userLogin = async () => {
    const response: ApiResponse<any, any> = await login({
      email: formik.values.Username,
      password: formik.values.Password,
    });
    if (response.data.success) {
      setAuthToken(response.data.token as string);
      formik.setErrors({
        ServerError: "",
      });
      closeModal();
      formik.resetForm();
    } else {
      formik.setErrors({
        ServerError: response.data.message,
      });
    }
  };

  return (
    <Modal
      show={isModalOpen}
      onHide={closeModal}
      centered
      backdrop="static"
      dialogClassName={styles.signUpModal}
    >
      <Modal.Header closeButton className={styles.signUpModalHeader}>
        <div>LogIn</div>
      </Modal.Header>
      <Modal.Body className={styles.signUpModalBody}>
        {/* <div className={styles.title}>Join Us!</div> */}
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className={styles.inputContainer}>
            <div className={styles.inputBox}>
              <IconInput
                icon={UserIcon}
                placeholder="Username"
                className={styles.loginInput}
                name="Username"
                value={formik.values.Username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.Password && formik.touched.Username && (
                <Error>{formik.errors.Username}</Error>
              )}
            </div>
            <div>
              <IconInput
                icon={LockIcon}
                placeholder="Password"
                className={styles.loginInput}
                name="Password"
                value={formik.values.Password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
              />
              {formik.errors.Password && formik.touched.Password && (
                <Error>{formik.errors.Password}</Error>
              )}
            </div>
          </div>
        </form>
        {formik.errors.ServerError && (
          <Error>*{formik.errors.ServerError}</Error>
        )}
        <Button
          className={styles.CreateBtn}
          type="submit"
          onClick={() => formik.handleSubmit()}
        >
          LogIn
        </Button>
        <span
          onClick={() => {
            openSignUp();
            formik.resetForm();
          }}
        >
          SignUp
        </span>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
