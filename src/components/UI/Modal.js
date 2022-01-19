import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const Backdrop = props => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = props => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const PORTAL_ELEMENT = document.getElementById("modal-root");

const Modal = props => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, PORTAL_ELEMENT)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        PORTAL_ELEMENT
      )}
    </>
  );
};

export default Modal;
