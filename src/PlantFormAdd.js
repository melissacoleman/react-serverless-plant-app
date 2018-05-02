import React from "react";
import { css } from "glamor";
import { graphql } from "react-apollo";
import uuidV4 from "uuid/v4";

import CreatePlant from "./mutations/CreatePlant";
import RemovePlant from "./RemovePlant";
import ListPlants from "./queries/ListPlants";
import ImageViewer from "./ImageViewer";

class PlantFormAdd extends React.Component {
    state = {};

    static getDerivedStateFromProps(newProps, oldState) {
        return {
            ...oldState,
            id: oldState.id || newProps.id,
            name: oldState.name || newProps.name || "",
            description: oldState.description || newProps.description || "",
            catsafe: oldState.catsafe || newProps.catsafe || false,
            slugsafe: oldState.slugsafe || newProps.slugsafe || false,
            imagePath: oldState.imagePath || newProps.imagePath || null,
            displayModeChange:
                oldState.displayModeChange || newProps.showPlantForm
        };
    }

    onChange = (key, value) => {
        if (key === "catsafe") {
            this.setState({ [key]: !this.state.catsafe });
        } else if (key === "slugsafe") {
            this.setState({ [key]: !this.state.slugsafe });
        } else {
            this.setState({ [key]: value });
        }
    };
    closeForm = () => {
        this.props.displayModeChange(false);
    };
    addPlant = () => {
        const { name, description, catsafe, slugsafe, imagePath } = this.state;
        this.props.onAdd({
            id: uuidV4(),
            catsafe,
            description,
            name,
            slugsafe,
            imagePath
        });
        this.setState({
            name: "",
            catsafe: "",
            description: "",
            slugsafe: "",
            showForm: false,
            imagePath: ""
        });
        this.closeForm();
    };
    updatePlant = () => {
        const {
            id,
            name,
            description,
            catsafe,
            slugsafe,
            imagePath
        } = this.state;
        console.log(
            `update ${id} ${name} ${description} ${catsafe} ${slugsafe} ${imagePath}`
        );
        this.closeForm();
    };
    render() {
        const cat_slider = this.state.catsafe ? (
            <span {...css(styles_switch.slider)} {...css(switch_checked)} />
        ) : (
            <span {...css(styles_switch.slider)} />
        );

        const slug_slider = this.state.slugsafe ? (
            <span {...css(styles_switch.slider)} {...css(switch_checked)} />
        ) : (
            <span {...css(styles_switch.slider)} />
        );

        return (
            <div {...css(styles.container)}>
                <p {...css(styles.close)} onClick={this.closeForm}>
                    x
                </p>
                <div {...css(styles.imageViewerContainer)}>
                    <ImageViewer
                        path={this.state.imagePath}
                        imageChange={this.onChange}
                    />
                </div>
                <input
                    value={this.state.name}
                    onChange={evt => this.onChange("name", evt.target.value)}
                    placeholder="name"
                    {...css(styles.input)}
                />
                <textarea
                    value={this.state.description}
                    onChange={evt =>
                        this.onChange("description", evt.target.value)
                    }
                    placeholder="description"
                    {...css(styles.input, styles.textarea)}
                />
                <div {...css(styles_switch.switchesContainer)}>
                    <div {...css(styles_switch.switchContainer)}>
                        <label {...css(styles_switch.switch_title)}>
                            catsafe
                        </label>
                        <label {...css(styles_switch.switch)}>
                            <input
                                type="checkbox"
                                {...css(styles_switch.input)}
                                checked={this.state.catsafe}
                                ref="complete"
                                onChange={evt =>
                                    this.onChange("catsafe", evt.target.value)
                                }
                            />
                            {cat_slider}
                        </label>
                    </div>
                    <div {...css(styles_switch.switchContainer)}>
                        <label {...css(styles_switch.switch_title)}>
                            slugsafe
                        </label>
                        <label {...css(styles_switch.switch)}>
                            <input
                                type="checkbox"
                                {...css(styles_switch.input)}
                                checked={this.state.slugsafe}
                                ref="complete"
                                onChange={evt =>
                                    this.onChange("slugsafe", evt.target.value)
                                }
                            />
                            {slug_slider}
                        </label>
                    </div>
                </div>
                {!this.state.id && (
                    <div {...css(styles.submitButtonContainer)}>
                        <div
                            {...css(styles.submitButton)}
                            onClick={this.addPlant}
                        >
                            <p>add</p>
                        </div>
                    </div>
                )}
                {this.state.id && (
                    <div>
                        <div {...css(styles.submitButtonContainer)}>
                            <div
                                {...css(styles.submitButton)}
                                onClick={this.updatePlant}
                            >
                                <p>save</p>
                            </div>{" "}
                        </div>
                        <RemovePlant
                            id={this.state.id}
                            onRemoval={this.closeForm}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default graphql(CreatePlant, {
    props: props => ({
        onAdd: plant =>
            props.mutate({
                variables: plant,
                optimisticResponse: {
                    __typename: "Mutation",
                    createPlant: { ...plant, __typename: "Plant" }
                },
                update: (proxy, { data: { createPlant } }) => {
                    const data = proxy.readQuery({ query: ListPlants });
                    data.listPlants.items.push(createPlant);
                    proxy.writeQuery({ query: ListPlants, data });
                }
            })
    })
})(PlantFormAdd);

const styles = {
    formtitle: {
        textAlign: "center",
        margin: "40px 0 20px"
    },
    container: {
        boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.15)",
        WebkitBoxShadow: "0px 0px 20px 0px rgba(0,0,0,0.15)",
        MozBoxShadow: "0px 0px 20px 0px rgba(0,0,0,0.15)",
        padding: 14,
        backgroundColor: "#f5e6e3",
        textAlign: "left",
        borderRadius: "3px",
        border: "none",
        position: "relative",

        display: "flex",
        flexDirection: "column",
        paddingLeft: 20,
        paddingRight: 20,

        ":hover": {
            backgroundColor: "#fbf0ee"
        },
        ":hover& input, :hover& textarea": {
            backgroundColor: "#fbf0ee"
        }
    },
    input: {
        outline: "none",
        border: "none",
        borderBottom: "1px dotted #fbd2d7",
        height: "25px",
        fontSize: "14px",
        backgroundColor: "#f5e6e3",
        padding: "10px 0 0"
    },
    textarea: {
        height: "50px"
    },
    imageViewerContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& div": {
            backgroundColor: "transparent",
            fontSize: "1px"
        },
        "& img": {
            width: "150px",
            backgroundColor: "#eee",
            clipPath: "circle(30%)"
        }
    },
    submitButtonContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    submitButton: {
        backgroundColor: "#fbd2d7",
        width: "50px",
        borderRadius: "10px",
        margin: "20px 0",
        padding: "8px 30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.85,
        cursor: "pointer",
        ":hover": {
            opacity: 1
        },
        "& p": {
            margin: 0
        }
    },
    plusContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    close: {
        color: "#aaa",
        margin: 0,
        fontSize: "19px",
        position: "absolute",
        top: "1em",
        left: "1em",
        background: "transparent",
        height: "35px",
        width: "35px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        ":hover": {
            background: "#f5e7e5"
        }
    }
};

let styles_switch = {
    switch_title: {
        margin: "15px 0 5px",
        color: "#777",
        fontSize: "14px"
    },
    switchesContainer: {
        marginBottom: "20px"
    },
    switchContainer: {
        display: "flex",
        flexDirection: "column"
    },
    switch: {
        position: "relative",
        display: "inline-block",
        width: "40px",
        height: "23px"
    },
    input: {
        display: "none"
    },
    slider: {
        position: "absolute",
        cursor: "pointer",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#e4d3d3",
        WebkitTransition: ".4s",
        transition: ".4s",
        borderRadius: "22px",
        ":before": {
            position: "absolute",
            content: " ",
            height: "17px",
            width: "17px",
            left: "3px",
            bottom: "3px",
            backgroundColor: "white",
            WebkitTransition: ".4s",
            transition: ".4s",
            borderRadius: "50%"
        }
    }
};

let switch_checked = {
    backgroundColor: "#fbd2d7",
    ":before": {
        WebkitTransform: "translateX(17px)",
        msTransform: "translateX(17px)",
        transform: "translateX(17px)"
    }
};
