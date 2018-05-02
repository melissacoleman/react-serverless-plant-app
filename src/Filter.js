import React from "react";
import { css } from "glamor";

class Filter extends React.Component {
    catsafeChange = e => {
        this.props.catsafeChange(e.target.checked);
    };

    notSlugsafeChange = e => {
        this.props.notSlugsafeChange(e.target.checked);
    };

    render() {
        return (
            <div {...css(styles.filter)}>
                <div {...css(styles.filterItemContainer)}>
                    <p {...css(styles.filterItem)}>
                        <input
                            type="checkbox"
                            checked={this.props.catsafeOnly}
                            onChange={this.catsafeChange}
                        />{" "}
                        CAT FRIENDLY
                    </p>
                    <p {...css(styles.filterItem)}>
                        <input
                            type="checkbox"
                            checked={this.props.notSlugSafeOnly}
                            onChange={this.notSlugsafeChange}
                        />{" "}
                        NOT SAFE FROM SLUGS
                    </p>
                </div>
            </div>
        );
    }
}

export default Filter;

const styles = {
    filter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    filterItemContainer: {
        display: "flex"
    },
    filterItem: {
        margin: 20,
        color: "#888",
        fontSize: "12px"
    }
};
