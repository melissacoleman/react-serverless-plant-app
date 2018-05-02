import React from "react";

import { css } from "glamor";
import { graphql } from "react-apollo";

import AddPlant from "./AddPlant";
import Filter from "./Filter";
import PlantShowOrEdit from "./PlantShowOrEdit";
import ListPlants from "./queries/ListPlants";
import onCreatePlantSub from "./subscriptions/NewPlantSubscription";
// import RemovedPlantSubscription from "./subscriptions/RemovedPlantSubscription";

class Plants extends React.Component {
    state = { catsafe: false, notSlugsafe: false };
    componentDidMount() {
        this.props.subscribeToNewPlants();
        // this.props.subscribeToRemovedPlants();
    }

    componentWillUnmount() {}

    catsafeChange = catsafeChecked => {
        this.setState({
            catsafe: catsafeChecked
        });
    };

    notSlugsafeChange = notSlugsafeChecked => {
        this.setState({
            notSlugsafe: notSlugsafeChecked
        });
    };

    render() {
        return (
            <div {...css(styles.container)}>
                <h1 {...css(styles.maintitle)}>Plants</h1>
                <Filter
                    catsafeOnly={this.state.catsafe}
                    catsafeChange={this.catsafeChange}
                    notSlugsafeOnly={this.state.notSlugsafe}
                    notSlugsafeChange={this.notSlugsafeChange}
                />
                <div {...css(styles.plantsContainer)}>
                    <AddPlant />
                    {this.props.plants.map(
                        (plant, i) =>
                            (!this.state.catsafe || plant.catsafe) &&
                            (!this.state.notSlugsafe || !plant.slugsafe) && (
                                <PlantShowOrEdit plant={plant} key={i} />
                            )
                    )}
                </div>
            </div>
        );
    }
}

const styles = {
    maintitle: {
        color: "#444"
    },
    plantsContainer: {
        margin: "50px 0",
        display: "grid",
        gridTemplateColumns:
            "minmax(300px, 400px) minmax(300px, 400px) minmax(300px, 400px)",
        gridGap: "15px"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        padding: "50px 100px",
        textAlign: "center"
    }
};

export default graphql(ListPlants, {
    options: {
        fetchPolicy: "cache-and-network"
    },
    props: props => {
        if (props.data.error != null)
            console.error("Plants error", props.data.error);
        return {
            plants: props.data.listPlants ? props.data.listPlants.items : [],
            subscribeToNewPlants: params => {
                props.data.subscribeToMore({
                    document: onCreatePlantSub,
                    updateQuery: (
                        prev,
                        { subscriptionData: { data: { onCreatePlant } } }
                    ) => {
                        return {
                            ...prev,
                            listPlants: {
                                __typename: "PlantConnection",
                                items: [
                                    onCreatePlant,
                                    ...prev.listPlants.items.filter(
                                        plant => plant.id !== onCreatePlant.id
                                    )
                                ]
                            }
                        };
                    }
                });
            }
            // subscribeToRemovedPlants: params => {
            //     props.data.subscribeToMore({
            //         document: RemovedPlantSubscription,
            //         updateQuery: (
            //             prev,
            //             { subscriptionData: { data: { onDeletePlant } } }
            //         ) => {
            //             return {
            //                 ...prev,
            //                 listPlants: {
            //                     __typename: "PlantConnection",
            //                     items: [
            //                         onDeletePlant,
            //                         ...prev.listPlants.items.filter(
            //                             plant => plant.id !== onDeletePlant.id
            //                         )
            //                     ]
            //                 }
            //             };
            //         }
            //     });
            //}
        };
    }
})(Plants);
