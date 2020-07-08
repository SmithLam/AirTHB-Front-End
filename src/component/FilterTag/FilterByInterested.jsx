import React from "react";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { StoreContext } from "../../ThemeContext";

function FilterByInterested(props) {
  let { currentPage, expList, expListURL, dataLength } = React.useContext(
    StoreContext
  );
  const [state, setState] = React.useState({});
  let [tagArray, setTagArray] = React.useState([]);
  let [tagArrayStr, setTagArrayStr] = React.useState("");

  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: !event.target.checked });
    let arr = [...tagArray];
    if (event.target.checked && !arr.includes(event.target.id)) {
      arr.push(event.target.id);
    } else if (!event.target.checked && arr.includes(event.target.id)) {
      arr = arr.filter((e) => e !== event.target.id);
    }
    console.log(arr);
    tagArrayStr = arr.join("&tags[$in]=");
    tagArrayStr = "tags[$in]=" + tagArrayStr;
    if (arr.length === 0) {
      tagArrayStr = "";
    }
    console.log(tagArrayStr);
    setTagArray(arr);
    getExpByTag();
  };

  let [tagList, setTagList] = React.useState(null);
  async function getTag() {
    let res = await Axios.get("https://airthb-group6.herokuapp.com/tags");
    setTagList(res.data.data);
    let test = { ...res.data.data };
    for (const smallObj in test) {
      test[smallObj].checked = false;
    }
    setState(test);
  }
  React.useEffect(() => {
    getTag();
  }, []);

  async function getExpByTag() {
    let res = await Axios.get(
      `https://airthb-group6.herokuapp.com/experiences?${tagArrayStr}`
    );
    console.log(
      `https://airthb-group6.herokuapp.com/experiences?${tagArrayStr}`
    );
    expList[1](res.data.data);
    dataLength[1](res.data.dataLength);
    console.log(res.data.dataLength);
  }
  if (state) {
    // console.log(state["0"]["checked"]);
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            color="primary"
            {...bindTrigger(popupState)}
          >
            Tags
          </Button>
          <Menu {...bindMenu(popupState)}>
            {tagList && state
              ? tagList.map((elm, index) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={index}
                          onChange={handleChange}
                          name={elm.tag}
                          id={elm._id}
                          color="primary"
                        />
                      }
                      label={elm.tag}
                    />
                    // <MenuItem onClick={() => {
                    //   popupState.close();
                    //   getExpByTag(elm._id)
                    // }}>{elm.tag}</MenuItem>
                  );
                })
              : ""}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default FilterByInterested;
