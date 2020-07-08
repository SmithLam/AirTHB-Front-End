import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import Axios from "axios";
import { StoreContext } from "../../ThemeContext";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}
function FilterByPrice(props) {
  let { expList, expListURL, currentPage, minPrice, maxPrice } = React.useContext(StoreContext);
  const classes = useStyles();
  const [value, setValue] = React.useState([0, 100]);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    minPrice[1](newValue[0])
    maxPrice[1](newValue[1])
    let res = await Axios.get(
      expListURL
    );
    expList[1](res.data.data);
    currentPage[1](1)
  };
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            color="primary"
            {...bindTrigger(popupState)}
          >
            Price
          </Button>
          <Menu {...bindMenu(popupState)}>
            <div className={classes.root}>
              <div className="price-filter-wrapper" style={{ padding: "20px" }}>
                <Typography id="range-slider" gutterBottom>
                  The average price of an experience is $22.
                </Typography>
                <Slider
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                />
                <Row>
                  <Col md={6}>
                    <Form.Label>Min Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Min price"
                      value={value[0]}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>Max Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Max Price"
                      value={value[1]}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default FilterByPrice;
