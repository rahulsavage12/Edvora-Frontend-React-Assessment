import React from 'react'
import { Row, Container, Col, Card, Dropdown, Spinner, Button } from 'react-bootstrap';
import './Filter.css'
const Filter = (props) => {
  const [uniqueProd, setUniqueProd] = React.useState(null);
  const [uniqueState, setUniqueState] = React.useState(null);
  const [uniqueCity, setUniqueCity] = React.useState(null);

  React.useEffect(() => {
    const findUnique = () => {
      //Parsing unique states, city and products to display inside dropdown box
      var temp = ([...new Set(props.productobj.map((item, i) => item.product_name))]);
      setUniqueProd(temp);
      temp = ([...new Set(props.productobj.map((item, i) => item.address.state))]);
      setUniqueState(temp);
      temp = ([...new Set(props.productobj.map((item, i) => item.address.city))]);
      setUniqueCity(temp);
    }

    findUnique();

  }, [props.productobj]);
  //clear filter to show all products
  const clearFilter = () => {
    props.setFilter(null);
  }
  //setting filter
  const setFilter = (filter) => {
    props.setFilter(filter)
  }
  return (
    <Card text='light' >
      <Card.Body >
        <div class="heading">Filters</div>
        <hr></hr>
        <Dropdown fluid>
          <Dropdown.Toggle id="dropdown-basic" >
            Products
          </Dropdown.Toggle>
          {uniqueProd ?
            <Dropdown.Menu id="menu">

              {uniqueProd.map((item) => {
                return <Dropdown.Item onClick={() => setFilter({ 'product': item })}>{item}</Dropdown.Item>
              })}


            </Dropdown.Menu> : <Spinner animation="border" variant="warning" />
          }
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            States
          </Dropdown.Toggle>
          {uniqueState ?
            <Dropdown.Menu>
              {uniqueState.map((item) => {
                return <Dropdown.Item onClick={() => setFilter({ 'state': item })}>{item}</Dropdown.Item>
              })}

            </Dropdown.Menu> : <Spinner animation="border" variant="warning" />
          }
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            City
          </Dropdown.Toggle>
          {uniqueCity ?
            <Dropdown.Menu>
              {uniqueCity.map((item) => {
                return <Dropdown.Item onClick={() => setFilter({ 'city': item })}>{item}</Dropdown.Item>
              })}
            </Dropdown.Menu> : <Spinner animation="border" variant="warning" />
          }
        </Dropdown>
        <Button id="clear" onClick={() => { clearFilter() }}>Clear Filter</Button>
      </Card.Body>
    </Card>
  )
}

export default Filter
