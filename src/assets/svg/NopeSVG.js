import React from "react";
import { css } from "glamor";

class NopeSVG extends React.Component {
    render() {
        return (
            <svg
                version="1.1"
                id="icons"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="12px"
                height="12px"
                viewBox="0 0 33.841 33.669"
                enableBackground="new 0 0 33.841 33.669"
                {...css(styles.svg)}
            >
                <g id="Icon_5_">
                    <circle
                        fill="none"
                        stroke="#888"
                        strokeWidth="3.15"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        cx="16.8"
                        cy="16.8"
                        r="15.3"
                    />
                    <line
                        fill="none"
                        stroke="#888"
                        strokeWidth="3.15"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        x1="12"
                        y1="12"
                        x2="22"
                        y2="22"
                    />

                    <line
                        fill="none"
                        stroke="#888"
                        strokeWidth="3.15"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        x1="22"
                        y1="12"
                        x2="12"
                        y2="22"
                    />
                </g>
            </svg>
        );
    }
}

export default NopeSVG;

const styles = {
    svg: {
        marginBottom: "-1px"
    }
};
