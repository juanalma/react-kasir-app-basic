// Import
import React, { Component } from "react";
import "../App.css";
import { Col, Container, Row } from "react-bootstrap";
import { NavbarComponent, ListCategoris, Result, Menus } from "../component";
import { API_URL } from "../utils/constans";
import axios from "axios";
import swal from "sweetalert";
import Total from "../component/Total";

class Home extends Component {
  // Pertama Kali di Load
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      chooseCategory: "Makanan",
      carts: [],
      idCart: null
    };
  }

  // Untuk get data dan simpan ke state
  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.chooseCategory)
      .then((res) => {
        this.setState({
          menus: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(API_URL + "keranjangs")
    //   .then((res) => {
    //     this.setState({
    //       carts: res.data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    this.getCarts();
  }

  getCarts = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        this.setState({
          carts: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Untuk change categori yang dipilih
  changeCategory = (value) => {
    this.setState({
      chooseCategory: value,
      menu: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        this.setState({
          menus: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // MEMASUKKAN KE KERANJANG
  goCart = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length == 0) {
          const cart = {
            jumlah: 1,
            total_harga: value.harga,
            id: value.id,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", cart)
            .then((res) => {
              swal({
                title: "Sukses",
                text: "Sukses memasukkan data ke keranjang",
                icon: "success",
                button: "OK",
              });
              this.getCarts();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const cart = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            id: value.id,
            product: value,
          };
          axios
            .put(API_URL + "keranjangs/" + value.id, cart)
            .then((res) => {
              swal({
                title: "Sukses",
                text: "Sukses memasukkan data ke keranjang",
                icon: "success",
                button: "OK",
              });
              this.getCarts();
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // componentDidUpdate(prevState) {
  //   if (this.state.carts !== prevState.carts) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         this.setState({
  //           carts: res.data,
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }

  render() {
    return (
      <div>
        <div className="mt=3">
          <Container fluid>
            <Row className="mt-3">
              <ListCategoris
                changeCategory={this.changeCategory}
                chooseCategory={this.state.chooseCategory}
              />
              <Col>
                <h4>Data Produk</h4>
                <hr />
                <Row>
                  {this.state.menus &&
                    this.state.menus.map((menu) => (
                      <Menus menu={menu} key={menu.id} goCart={this.goCart} idCart={this.state.idCart} />
                    ))}
                </Row>
              </Col>
              <Result carts={this.state.carts} />
            </Row>
          </Container>
          <Total carts={this.state.carts} {...this.props}/>
        </div>
      </div>
    );
  }
}

export default Home;
