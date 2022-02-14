import React from 'react'
import Filter from '../Components/Filter';
import { Row, Container, Col, Card, Dropdown, Spinner } from 'react-bootstrap';
import './Home.css'
import Products from '../Components/Products';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

//api url
const baseURL = "https://assessment-edvora.herokuapp.com/";

const Home = () => {
  const [productslist, setProducts] = useState(null);
  const [filter, setFilter] = useState(null);
  //fetching data from api
  React.useEffect(() => {
    const fetchData = async () => {
      axios.get(baseURL).then((response) => {
        setProducts(response.data);
      });
    }
    fetchData();
  }, []);


  return (
    <div class="Home">
      <Container>
        <Row>
          <Col md={2} >
            {productslist != null ?
              <Filter productobj={productslist} setFilter={setFilter}></Filter> : <Spinner animation="border" variant="warning" />}
          </Col>
          <Col md={10}>
            <h1 class="Head" align="left">Edvora</h1>
            <Row>
              <Col>
                <h2 class="Subtitle">Products</h2>
              </Col>
            </Row>
            <Row>
              <Col >
                {productslist != null ?
                  <Products productobj={productslist} selectedFilter={filter} setData={setProducts} /> : <Spinner animation="border" variant="warning" />}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home