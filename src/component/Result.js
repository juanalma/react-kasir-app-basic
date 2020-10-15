import React, { Component } from "react";
import { Col, ListGroup, Row, Badge, Modal, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { Sum } from "@lundiak/react-sum";
import ModalComponent from "./ModalComponent";

export default class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      cartsDetails: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: false
    };
  }

  handleShow = (cart) => {
    this.setState({
      showModal: true,
      cartsDetails: {
        nama: cart.product.nama,
        harga: cart.product.harga
      },
      jumlah: cart.jumlah,
      totalHarga: cart.total_harga
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.cartsDetails.harga * (this.state.jumlah+1)
    });

  };

  kurang = () => {
    if (this.state.jumlah > 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.cartsDetails.harga * (this.state.jumlah-1)
      });
    }
  };

  changeHandle = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
    console.log(this.state.keterangan);
  };

  onSubmit = (event) => {
    event.preventDefault();
  }
  render() {
    return (
      <Col md="3">
        <h4>Hasil</h4>
        <hr />
        {this.props.carts.length !== 0 && (
          <ListGroup variant="flush">
            {this.props.carts.map((cart) => (
              <ListGroup.Item onClick={() => this.handleShow(cart)}>
                <Row>
                  <Col xs="2">
                    <Badge pill variant="success">
                      {cart.jumlah}
                    </Badge>
                  </Col>
                  <Col>
                    <p>{cart.product.nama}</p>
                    <h6>{numberWithCommas(cart.product.harga)}</h6>
                  </Col>
                  <Col> 
                    <strong>Rp. {numberWithCommas(cart.total_harga)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <ModalComponent
          handleClose={this.handleClose}
          {...this.state}
          tambah={this.tambah}
          kurang={this.kurang}
          changeHandle={this.changeHandle}
          onSubmit={this.onSubmit}
        />
      </Col>
    );
  }
}
