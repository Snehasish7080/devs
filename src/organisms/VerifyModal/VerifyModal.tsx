import React, { useContext } from "react";
import styles from "./VerifyModal.module.scss";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import Button from "../../atoms/Button/Button";
import Error from "../../molecules/Error/Error";
import Input from "../../atoms/Input/Input";
import { verifyValidation } from "./Validation";
import { NavContext } from "../NavBar/NavBar";
import { verifyAccount } from "../../api/Verify";
import { ApiResponse } from "apisauce";

type VerifyModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  openVerify: () => void;
};

function VerifyModal({
  isModalOpen,
  closeModal,
  openVerify,
}: VerifyModalProps) {
  const { email } = useContext(NavContext);
  const formik = useFormik({
    initialValues: {
      otp: "",
      ServerVerifyError: "",
    },
    validationSchema: verifyValidation,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      userVerify();
    },
  });

  const userVerify = async () => {
    const response: ApiResponse<any, any> = await verifyAccount({
      email: email,
      otp: parseInt(formik.values.otp),
    });
    if (response.data.success) {
      formik.setErrors({
        ServerVerifyError: "",
      });
      formik.resetForm();
      closeModal();
    } else {
      formik.setErrors({
        ServerVerifyError: response.data.message,
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
        <div>Verify</div>
      </Modal.Header>
      <Modal.Body className={styles.signUpModalBody}>
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className={styles.inputContainer}>
            <span className={styles.verifyTitle}>
              *Check your email to verify your account with OTP
            </span>
            <div className={styles.inputBox}>
              <Input
                className={styles.verifyInput}
                name="otp"
                id="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="OTP"
                type="number"
              />

              {formik.errors.otp && formik.touched.otp && (
                <Error>{formik.errors.otp}</Error>
              )}
            </div>
          </div>
          {formik.errors.ServerVerifyError && (
            <Error>*{formik.errors.ServerVerifyError}</Error>
          )}
        </form>
        <Button
          className={styles.CreateBtn}
          type="submit"
          onClick={() => formik.handleSubmit()}
        >
          Verify
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default VerifyModal;
