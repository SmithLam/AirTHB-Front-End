import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Container } from "react-bootstrap";
import FilterByInterested from "./FilterByInterested";
import FilterByDates from "./FilterByDates";
import FilterByPrice from "./FilterByPrice";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import { StoreContext } from "../../ThemeContext";
import Axios from "axios";
import {Link} from 'react-router-dom'

function FilterTag(props) {
  
  let [dataLength,setDataLength]=React.useState(0)
  let { currentPage, expList,expListURL} = React.useContext(StoreContext);
  let URL=expListURL
  async function getExpList() {
    try {
      let res = await Axios.get(
      URL
      );
      console.log(expListURL,"THIS IS URL")
      setDataLength(res.data.dataLength);
      
    } catch (err) {}
  }
  React.useEffect(() => {
    getExpList()
    return () => {
      
    }
  }, [expListURL])


  let changePage = async (numPage) => {
    // page[1](numPage);
    currentPage[1](numPage);
    let res = await Axios.get(
      expListURL
    );
    expList[1](res.data.data);

    // getDataFromAPI(numPage);

    // props.getProductListBySearch(numPage)
    //fetch a data
    //or update a query to get data
  };
  return (
    <Container>
      <div className="filter-section">
        <FilterByInterested></FilterByInterested>
        <FilterByDates></FilterByDates>

        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button
                variant="contained"
                color="primary"
                {...bindTrigger(popupState)}
              >
                Language
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Cake</MenuItem>
                <MenuItem onClick={popupState.close}>Death</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
        <FilterByPrice></FilterByPrice>
        <Link to="/experiences/create" className="create-exp-btn">Create Experience</Link>
      </div>
      {expList[0] || dataLength!==0 ? (
        <Pagination
          currentPage={currentPage[0]}
          totalPages={dataLength%10 !==0 ?Math.round(dataLength / 10)+1 :Math.round(dataLength / 10) }
          changeCurrentPage={changePage}
          theme="square-fill"
        />
      ) : (
        ""
      )}
    </Container>
  );
}

export default FilterTag;
