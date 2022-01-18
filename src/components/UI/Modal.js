import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const Backdrop = () => {
  return <div className={styles.backdrop}></div>;
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
      {ReactDOM.createPortal(<Backdrop />, PORTAL_ELEMENT)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        PORTAL_ELEMENT
      )}
    </>
  );
};

export default Modal;
