import React from "react";
import { css } from "glamor";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

import DeleteSVG from "./assets/svg/DeleteSVG";

import DeletePlant from "./mutations/DeletePlant";
import ListPlants from "./queries/ListPlants";

class RemovePlant extends React.Component {
    state = { id: this.props.id };

    removePlant = () => {
        const id = this.state.id;
        this.props.onDelete({ id });
        this.props.onRemoval();
    };
    showId = e => {
        e.preventDefault();
        console.log(`id: ${this.state.id}`);
    };
    render() {
        return (
            <Link
                to="/"
                onClick={this.removePlant}
                onMouseOver={this.showId}
                {...css(styles.deleteLink)}
            >
                <DeleteSVG />
            </Link>
        );
    }
}

export default graphql(DeletePlant, {
    props: props => ({
        onDelete: plant =>
            props.mutate({
                variables: plant,
                optimisticResponse: {
                    __typename: "Mutation",
                    deletePlant: {
                        ...{
                            id: "test",
                            name: "tempval",
                            description: "",
                            slugsafe: false,
                            catsafe: false,
                            imagePath: ""
                        },
                        __typename: "Plant"
                    }
                },
                update: (proxy, { data: { deletePlant } }) => {
                    const data = proxy.readQuery({ query: ListPlants });
                    const listWithoutDeletedPlant = data.listPlants.items.filter(
                        function(el) {
                            return el.id !== plant.id;
                        }
                    );
                    data.listPlants.items = listWithoutDeletedPlant;
                    proxy.writeQuery({ query: ListPlants, data });
                }
            })
    })
})(RemovePlant);

const styles = {
    deleteLink: {
        position: "absolute",
        top: "1em",
        right: "1em",
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
