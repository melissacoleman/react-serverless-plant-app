import React from "react";
import { Link } from "react-router-dom";
import { css } from "glamor";

export default class Nav extends React.Component {
    render() {
        return (
            <div {...css(styles.container)}>
                <Link to="/" {...css(styles.link)}>
                    <h1 {...css(styles.heading)}>GARDEN BOOK</h1>
                </Link>
                <Link to="/addPlant" {...css(styles.link)}>
                    Add Plant
                </Link>
            </div>
        );
    }
}

const styles = {
    link: {
        textDecoration: "none",
        marginLeft: 15,
        color: "white",
        ":hover": {
            textDecoration: "underline"
        }
    },
    container: {
        display: "flex",
        backgroundColor: "#fbd2d7",
        padding: "0px 30px",
        alignItems: "center"
    },
    heading: {
        color: "white",
        paddingRight: 20
    }
};
