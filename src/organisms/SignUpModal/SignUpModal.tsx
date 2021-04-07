import React, { useContext } from "react";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import IconInput from "../../molecules/IconInput/IconInput";
import styles from "./SignUpModal.module.scss";
import UserIcon from "../../assets/images/UserIcon.svg";
import MailIcon from "../../assets/images/MailIcon.svg";
import LockIcon from "../../assets/images/LockIcon.svg";
import Button from "../../atoms/Button/Button";
import { signUpValidation } from "./Validation";
import Error from "../../molecules/Error/Error";
import { ApiResponse } from "apisauce";
import { signUp } from "../../api/SignUp";
import { NavContext } from "../NavBar/NavBar";
import Loader from "../../atoms/Loader/Loader";

type SignUpModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  openLogin: () => void;
  openVerify: () => void;
};
function SignUpModal({
  isModalOpen,
  closeModal,
  openLogin,
  openVerify,
}: SignUpModalProps) {
  const { setEmail } = useContext(NavContext);

  const formik = useFormik({
    initialValues: {
      Username: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      ServerSignUpError: "",
    },
    validationSchema: signUpValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      userSignUp();
    },
  });

  const userSignUp = async () => {
    const response: ApiResponse<any, any> = await signUp({
      email: formik.values.Email,
      username: formik.values.Username,
      password: formik.values.Password,
    });

    console.log(response.data);
    if (response.data.success) {
      formik.setErrors({
        ServerSignUpError: "",
      });
      closeModal();
      if (setEmail) setEmail(formik.values.Email);
      formik.resetForm();
      formik.setSubmitting(false);
      openVerify();
    } else {
      formik.setErrors({
        ServerSignUpError: response.data.message, //TODO
      });
      formik.setSubmitting(false);
    }
  };

  const onCloseModal = () => {
    closeModal();
    formik.resetForm();
  };

  if (formik.isSubmitting) {
    return <Loader />;
  } else {
    return (
      <Modal
        show={isModalOpen}
        onHide={onCloseModal}
        backdrop="static"
        centered
        dialogClassName={styles.signUpModal}
      >
        <Modal.Header closeButton className={styles.signUpModalHeader}>
          <div>Sign Up</div>
        </Modal.Header>
        <Modal.Body className={styles.signUpModalBody}>
          <div className={styles.title}>Join Us!</div>
          <form noValidate onSubmit={formik.handleSubmit}>
            <div className={styles.inputContainer}>
              <div>
                <IconInput
                  icon={UserIcon}
                  placeholder="Username"
                  name="Username"
                  value={formik.values.Username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.Username && formik.touched.Username && (
                  <Error>{formik.errors.Username}</Error>
                )}
              </div>
              <div>
                <IconInput
                  icon={MailIcon}
                  placeholder="Email"
                  name="Email"
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.Email && formik.touched.Email && (
                  <Error>{formik.errors.Email}</Error>
                )}
              </div>
              <div>
                <IconInput
                  icon={LockIcon}
                  placeholder="Password"
                  name="Password"
                  type="password"
                  value={formik.values.Password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.Password && formik.touched.Password && (
                  <Error>{formik.errors.Password}</Error>
                )}
              </div>
              <div>
                <IconInput
                  icon={LockIcon}
                  placeholder="Confirm"
                  name="ConfirmPassword"
                  type="password"
                  value={formik.values.ConfirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.ConfirmPassword &&
                  formik.touched.ConfirmPassword && (
                    <Error>{formik.errors.ConfirmPassword}</Error>
                  )}
              </div>
            </div>
          </form>
          {formik.errors.ServerSignUpError && (
            <Error>*{formik.errors.ServerSignUpError}</Error>
          )}
          <Button
            className={styles.CreateBtn}
            type="submit"
            onClick={() => formik.handleSubmit()}
          >
            Create an account
          </Button>
          <span onClick={openLogin}>Login</span>
        </Modal.Body>
        {/* <Modal.Footer className={styles.signUpModalFooter}></Modal.Footer> */}
      </Modal>
    );
  }
}

export default SignUpModal;
