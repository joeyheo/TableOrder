import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";

interface SingleItemProps {
	item: {
		id: string;
		name: string;
		price: number;
	};
}

const SingleItem: React.FC<SingleItemProps> = ({ item }) => {
	return (
		<Box border="1px" borderColor="gray.200" p={4} mb={4}>
			<Text fontSize="xl">{item.name}</Text>
			<Text>Price: ${item.price}</Text>
			<Button mt={2} colorScheme="blue">
				Add to Cart
			</Button>
		</Box>
	);
};

export default SingleItem;
