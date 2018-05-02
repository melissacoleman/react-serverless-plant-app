import React from "react";
import { css } from "glamor";

import EditSVG from "./assets/svg/EditSVG";

class EditPlant extends React.Component {
    state = { id: this.props.id };

    editPlant = () => {
        const id = this.state.id;
        console.log(`id = ${id}`);
        this.props.displayEditChange();
    };
    render() {
        return (
            <button src="/" onClick={this.editPlant} {...css(styles.button)}>
                <EditSVG />
            </button>
        );
    }
}

export default EditPlant;

const styles = {
    button: {
        background: "transparent",
        height: "35px",
        width: "35px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        ":hover": {
            background: "#f5e7e5"
        }
    }
};
