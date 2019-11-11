import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import LikeIcon from "../static/like.png";

const Example = props => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.onClose();
  };
  //   const handleShow = () => setShow(true);
  return (
    <>
      <Modal
        style={{ margin: "auto" }}
        size="sm"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header
          style={{ border: "none", justifyContent: "center", margin: "auto" }}
        >
          <Modal.Title>Congrats!</Modal.Title>
          <img width="10%" src={LikeIcon} alt="like" />
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>{props.body}</Modal.Body>
        <Modal.Footer style={{ padding: "0.5rem", border: "none" }}>
          <Button
            style={{ padding: "0.2rem" }}
            variant="primary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Example;
