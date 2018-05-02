import gql from "graphql-tag";

export default gql`
    mutation createPlant(
        $id: ID!
        $name: String!
        $description: String!
        $slugsafe: Boolean!
        $catsafe: Boolean!
        $imagePath: String
    ) {
        createPlant(
            input: {
                id: $id
                name: $name
                description: $description
                slugsafe: $slugsafe
                catsafe: $catsafe
                imagePath: $imagePath
            }
        ) {
            id
            name
            description
            slugsafe
            catsafe
            imagePath
        }
    }
`;
