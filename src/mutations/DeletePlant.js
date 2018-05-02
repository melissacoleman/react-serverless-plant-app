import gql from "graphql-tag";

export default gql`
    mutation deletePlant($id: ID!) {
        deletePlant(input: { id: $id }) {
            id
            name
            description
            slugsafe
            catsafe
            imagePath
        }
    }
`;
