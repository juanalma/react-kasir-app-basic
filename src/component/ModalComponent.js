import React from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const ModalComponent = ({
  showModal,
  handleClose,
  cartsDetails,
  jumlah,
  tambah,
  kurang,
  keterangan,
  changeHandle,
  onSubmit,
  totalHarga
}) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{cartsDetails.nama}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Total</Form.Label>
            <br></br>
            <strong>
              Rp. {numberWithCommas(parseInt(totalHarga))}
            </strong>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Jumlah</Form.Label>
            <Row>
              <Col md="1">
                <Button
                  variant="primary"
                  className="btn-sm"
                  onClick={() => kurang()}
                >
                  -
                </Button>
              </Col>
              <Col md="1">
                <h5>{jumlah}</h5>
              </Col>
              <Col md="1">
                <Button
                  variant="primary"
                  className="btn-sm"
                  onClick={() => tambah()}
                >
                  +
                </Button>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control as="textarea" rows={3} value={keterangan} onChange={(event) => changeHandle(event)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
