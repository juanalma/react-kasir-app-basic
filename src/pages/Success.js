import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constans";
import axios from "axios";

export default class Success extends Component {
  componentDidMount() {
    axios.get(API_URL + "keranjangs").then((res) => {
      const keranjangs = res.data;
      keranjangs.map(function(items) {
        return axios
          .delete(API_URL + "keranjangs/"+items.id)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      });
    });
  }
  render() {
    return (
      <div className="text-center">
        <h3 className="mt-3">Success</h3>
        <Image src="assets/images/success.png" width="500" />
        <br></br>
        <Button className="btn btn-primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
