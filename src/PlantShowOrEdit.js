import React from "react";
import { css } from "glamor";
import { S3Image } from "aws-amplify-react";

import EditPlant from "./EditPlant";
import PlantFormEdit from "./PlantFormEdit";

import CheckSVG from "./assets/svg/CheckSVG";
import NopeSVG from "./assets/svg/NopeSVG";

class PlantShowOrEdit extends React.Component {
    state = {
        showForm: false
    };

    editPlant = () => {
        const id = this.state.id;
        console.log(`edit = ${id}`);
        this.setState({ showForm: true });
    };

    showPlantForm = value => {
        this.setState({ showForm: value });
    };

    render() {
        let check_or_not = value => (value ? <CheckSVG /> : <NopeSVG />);
        let plant = this.props.plant;

        return this.state.showForm ? (
            <PlantFormEdit
                id={plant.id}
                name={plant.name}
                description={plant.description}
                catsafe={plant.catsafe}
                slugsafe={plant.slugsafe}
                imagePath={plant.imagePath}
                displayModeChange={this.showPlantForm}
            />
        ) : (
            <div {...css(styles.plant)} key={this.state.key}>
                <div className={editContainer}>
                    <EditPlant
                        id={plant.id}
                        displayEditChange={this.editPlant}
                    />
                </div>
                <div {...css(styles.subtitle, styles.imageContainer)}>
                    {!plant.imagePath && (
                        <span role="img" aria-label="plant">
                            🌱
                        </span>
                    )}
                    {plant.imagePath && <S3Image path={plant.imagePath} />}
                </div>
                <p {...css(styles.title)}>{plant.name}</p>
                <p {...css(styles.subtitle)}>{plant.description}</p>
                <div {...css(styles.icons)}>
                    <p {...css(styles.subtitle)}>
                        <span role="img" aria-label="Snail safe">
                            🐌
                        </span>{" "}
                        {check_or_not(plant.slugsafe)}
                    </p>
                    <p {...css(styles.subtitle)}>
                        <span role="img" aria-label="Cat friendly">
                            🐱
                        </span>{" "}
                        {check_or_not(plant.catsafe)}
                    </p>
                </div>
            </div>
        );
    }
}

export default PlantShowOrEdit;

const editContainer = css({
    position: "absolute",
    bottom: 20,
    right: 20,
    display: "flex"
});

const styles = {
    title: {
        fontSize: 16,
        color: "#444"
    },
    subtitle: {
        fontSize: 14,
        color: "#888"
    },
    icons: {
        display: "flex",
        flexDirection: "row",
        "& p": {
            marginRight: 20
        }
    },
    imageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& img": {
            height: "100px",
            width: "150px",
            backgroundColor: "#eee",
            clipPath: "circle(30%)"
        },
        "& span": {
            textAlign: "center",
            lineHeight: "7em",
            height: "100px",
            width: "150px",
            backgroundColor: "#eee",
            clipPath: "circle(30%)"
        }
    },
    plant: {
        position: "relative",
        boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.15)",
        WebkitBoxShadow: "0px 0px 20px 0px rgba(0,0,0,0.15)",
        MozBoxShadow: "0px 0px 20px 0px rgba(0,0,0,0.15)",
        padding: 14,
        backgroundColor: "#f5e6e3",
        textAlign: "left",
        borderRadius: "3px",
        border: "none",
        ":hover": {
            backgroundColor: "#fbf0ee"
        },
        [`:not(:hover)& .${editContainer}`]: {
            position: "absolute",
            width: "19px" /* Unaccessible if 0 */,
            height: "19px",
            margin: "-1px",
            padding: 0,
            border: 0,
            clip: "rect(0 0 0 0)",
            overflow: "hidden"
        }
    }
};
