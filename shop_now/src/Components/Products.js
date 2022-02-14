import React from 'react'
import './Product.css'
import { Row, Container, Col, Card, Dropdown, Image } from 'react-bootstrap';
import Carousel from 'react-elastic-carousel';

const Products = (props) => {
    const [uniqueProds, setUniqueProd] = React.useState(null);
    const [windowWidth, setwindowWidth] = React.useState(window.innerWidth);
    const [numberOfCards, setnumberOfCards] = React.useState(3);

    //changing the number of cards inside carousel based on the width of the device
    //Made it resposive through an event listener
    const changeCarouselnumber = () => {
        if (window.innerWidth > 1200) {
            setnumberOfCards(3);
        }
        if (window.innerWidth < 1190) {
            setnumberOfCards(3);
        }
        if (window.innerWidth < 1000) {
            setnumberOfCards(2);
        }
        if (window.innerWidth < 700) {
            setnumberOfCards(1);
        }
    }
    window.addEventListener('resize', function () { setwindowWidth(window.innerWidth) });

    React.useEffect(() => {
        changeCarouselnumber()
        const findUnique = () => {
            //getting all unique product names based on filter applied
            var uniqueProd = ([...new Set(props.productobj.map((item, i) => item.product_name))]);
            if (props.selectedFilter != null) {
                if (props.selectedFilter.product != null) {
                    uniqueProd = [props.selectedFilter.product]
                }
                if (props.selectedFilter.state != null) {
                    uniqueProd = ([...new Set(props.productobj.map(function (item, i) {
                        if (item.address.state == props.selectedFilter.state) { return item.product_name; }
                    }))]);
                }
                if (props.selectedFilter.city != null) {
                    uniqueProd = ([...new Set(props.productobj.map(function (item, i) {
                        if (item.address.city == props.selectedFilter.city) { return item.product_name; }
                    }))]);
                }
            }

            setUniqueProd(uniqueProd);
        }
        findUnique();
    }, [props.selectedFilter, windowWidth]);
 
    return (
        uniqueProds ?
            <div style={{ color: "white" }}>
                {uniqueProds.map(function (productName) {
                    if (productName == null) return null;
                    return <div><p class="Product-header">{productName}</p>
                        <hr></hr>
                        <Carousel itemsToShow={numberOfCards} class="carousel" itemPadding={[1, 1, 1, 1]} pagination={false}>
                            {props.productobj.filter((products) => {
                                if (props.selectedFilter != null) {
                                    if (props.selectedFilter.state != null) {
                                        return products.product_name == productName && products.address.state == props.selectedFilter.state
                                    }
                                    if (props.selectedFilter.city != null) {
                                        return products.product_name == productName && products.address.city == props.selectedFilter.city
                                    }
                                }
                                return products.product_name == productName
                            }
                            ).map(function (item, i) {
                                //cards for each object
                                return <Card text='light' class="Prod_card" >
                                    <Card.Body class="productTile">

                                        <Container class="product-container" fluid="lg">
                                            <Row ><Col >
                                                <Image src={item.image} fluid bsPrefix='img'></Image>
                                            </Col>
                                                <Col >
                                                    <Row>
                                                        <Col style={{ width: "100px" }}>
                                                            <div class="productHeader">
                                                                {item.product_name}
                                                            </div>

                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <div class="grey-text">
                                                                {item.brand_name}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            $ {item.price}
                                                        </Col>
                                                    </Row>

                                                </Col>

                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <p class="grey-text">
                                                        {item.address.city},<br />{item.address.state}
                                                    </p>
                                                </Col>
                                                <Col md={6}>
                                                    <div class="grey-text" id="nonbreak">
                                                        date: {item.date.split('T')[0]}
                                                    </div>
                                                </Col>
                                            </Row>



                                            <div class="grey-text">
                                                {item.discription}
                                            </div>


                                        </Container>
                                    </Card.Body>
                                </Card>

                            })}
                        </Carousel>
                    </div>
                })}


            </div> : <div>loading</div>
    )
}

export default Products