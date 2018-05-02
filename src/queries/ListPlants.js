import gql from "graphql-tag";

export default gql`
    query listPlants {
        listPlants {
            items {
                id
                name
                description
                slugsafe
                catsafe
                imagePath
            }
        }
    }
`;
