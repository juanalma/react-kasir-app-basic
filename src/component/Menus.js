import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";

// Component Card Menu
const Menus = ({ menu, goCart }) => {
  return (
    <Col md={4} xs={6} className="mb-3">
      <Card className="shadow" onClick={() => goCart(menu)}>
        <Card.Img variant="top" src={"assets/images/"+menu.category.nama.toLowerCase()+"/"+menu.gambar} />
        <Card.Body>
          <Card.Title>{menu.nama} ({menu.kode})</Card.Title>
          <Card.Text>
            Rp. {numberWithCommas(menu.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
