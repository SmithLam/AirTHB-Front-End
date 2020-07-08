import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

function FilterByDates(props) {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button
            variant="contained"
            color="primary"
            {...bindTrigger(popupState)}
          >
            Dates
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Cake</MenuItem>
            <MenuItem onClick={popupState.close}>Death</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default FilterByDates;
