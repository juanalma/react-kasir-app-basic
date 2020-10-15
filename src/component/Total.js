import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import axios from "axios";
import { API_URL } from "../utils/constans";

class Total extends Component {
  insertPesanan = (totalBayar) => {
    const data = {
        total_bayar: totalBayar,
        menu: this.props.carts
    }

    axios.post(API_URL+"pesanans", data).then((res) => {
        this.props.history.push("/success")
    })
  };

  render() {
    const totalBayar = this.props.carts.reduce(function (accumulator, pilot) {
      return accumulator + pilot.total_harga;
    }, 0);
    return (
      <div class="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>
              Total:{" "}
              <strong className="float-right mr-2">
                Rp. {numberWithCommas(totalBayar)}
              </strong>
            </h4>
            <Button
              onClick={() => this.insertPesanan(totalBayar)}
              variant="primary"
              block
              className="mb-2 mr-2"
              size="lg"
            >
              <strong>BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Total;
