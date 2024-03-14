import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Import your Firebase configuration
import SingleItem from "../component/singleitem";

const Dashboard: React.FC = () => {
	const [items, setItems] = useState<any[]>([]);

	useEffect(() => {
		const fetchItems = async () => {
			const querySnapshot = await getDocs(collection(db, "items"));
			const itemsData = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setItems(itemsData);
		};

		fetchItems();
	}, []);

	return (
		<Box>
			{items.map((item) => (
				<SingleItem key={item.id} item={item} />
			))}
		</Box>
	);
};

export default Dashboard;
