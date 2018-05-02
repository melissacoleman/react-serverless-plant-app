import React from "react";
import { css } from "glamor";

import PlantFormAdd from "./PlantFormAdd";

import PlusSVG from "./assets/svg/PlusSVG";

class AddPlant extends React.Component {
    state = {
        showForm: false
    };
    showPlantForm = value => {
        this.setState({ showForm: value });
    };
    render() {
        return this.state.showForm ? (
            <PlantFormAdd displayModeChange={this.showPlantForm} />
        ) : (
            <button
                {...css(styles.box)}
                onClick={() => this.showPlantForm(true)}
            >
                <div {...css(styles.plusContainer)}>
                    <PlusSVG />
                </div>
            </button>
        );
    }
}

export default AddPlant;

const styles = {
    box: {
        boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.15)",
        WebkitBoxShadow: "0px 0px 20px 0px rgba(0,0,0,0.15)",
        MozBoxShadow: "0px 0px 20px 0px rgba(0,0,0,0.15)",
        padding: 14,
        border: "none",
        backgroundColor: "#f5e6e3",
        textAlign: "left",
        borderRadius: "3px",
        ":hover": {
            backgroundColor: "#fbf0ee"
        }
    },
    plusContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
};
