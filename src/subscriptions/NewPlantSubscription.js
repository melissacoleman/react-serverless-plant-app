import gql from "graphql-tag";

export default gql`
    subscription onCreatePlantSub(
        $id: ID
        $name: String
        $description: String
        $slugsafe: Boolean
        $catsafe: Boolean
        $imagePath: String
    ) {
        onCreatePlant(
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
