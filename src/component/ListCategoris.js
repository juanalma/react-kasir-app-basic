import axios from "axios";
import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constans";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCheese,
  faCoffee,
} from "@fortawesome/free-solid-svg-icons";

// Function icon untuk merubah icon sesuai nama menu
const Icon = function ({ nama }) {
  if (nama == "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-3" />;
  if (nama == "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
  if (nama == "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-3" />;
};

class ListCategoris extends Component {

// Pertama kali yang diload
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

//   Untuk get data categori dan disimpan di state
  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        this.setState({
          categories: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { chooseCategory, changeCategory } = this.props;
    return (
      <Col md="2">
        <h4>List Categori</h4>
        <hr />
        <ListGroup>
          {this.state.categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => changeCategory(category.nama)}
              className={chooseCategory === category.nama && "category-active"}
            >
              <Icon nama={category.nama} />
              {category.nama}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    );
  }
}

  export default ListCategoris;
