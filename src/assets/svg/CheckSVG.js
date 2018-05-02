import React from "react";
import { css } from "glamor";

class CheckSVG extends React.Component {
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
                viewBox="0 0 41.92 41.92"
                enableBackground="new 0 0 41.92 41.92"
                {...css(styles.svg)}
            >
                <g id="Icon_52_">
                    <circle
                        fill="none"
                        stroke="#888"
                        strokeWidth="3.92"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        cx="20.96"
                        cy="20.96"
                        r="19"
                    />
                    <polyline
                        fill="none"
                        stroke="#888"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        points="13.091,20.338 18.483,25.87 29.091,15.87"
                    />
                </g>
            </svg>
        );
    }
}

export default CheckSVG;

const styles = {
    svg: {
        marginBottom: "-1px"
    }
};
