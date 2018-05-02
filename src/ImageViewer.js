import React, { Component } from "react";
import { Storage } from "aws-amplify";
import { S3Image } from "aws-amplify-react";
import { css } from "glamor";

class ImageViewer extends Component {
    state = {};

    static getDerivedStateFromProps(newProps, oldState) {
        return {
            ...oldState,
            path: oldState.path || newProps.path || null
        };
    }

    handleUpload = event => {
        const file = event.target.files[0];
        const path = file.name;
        Storage.put(path, file).then(() => {
            this.setState({ path });
            this.props.imageChange("imagePath", this.state.path);
        });
    };

    render() {
        return (
            <div {...css(styles.customFileContainer)}>
                <label {...css(styles.customFile)}>
                    {!this.state.path && (
                        <span
                            role="img"
                            aria-label="plant"
                            {...css(styles.span)}
                        >
                            🌱
                        </span>
                    )}
                    {this.state.path && <S3Image path={this.state.path} />}

                    <input
                        type="file"
                        onChange={this.handleUpload}
                        {...css(styles.file)}
                    />
                </label>
            </div>
        );
    }
}

const styles = {
    file: {
        display: "none"
    },
    customFileContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100px",
        width: "150px"
    },
    customFile: {
        cursor: "pointer"
    },
    span: {
        display: "block",
        textAlign: "center",
        lineHeight: "7em",
        fontSize: "14px",
        height: "100px",
        width: "150px",
        backgroundColor: "#eee",
        clipPath: "circle(30%)"
    }
};
export default ImageViewer;
