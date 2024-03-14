import React from "react";
import {
	Box,
	Flex,
	Avatar,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useColorModeValue,
	Stack,
	useColorMode,
	Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuth } from "../provider/authprovider"; // Adjust this import path as necessary

export default function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { user, logout, signInWithGoogle } = useAuth(); // Use the useAuth hook to access the user and logout function

	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
					<Box>Logo</Box>

					<Flex alignItems={"center"}>
						<Stack direction={"row"} spacing={7}>
							<Button onClick={toggleColorMode}>
								{colorMode === "light" ? <MoonIcon /> : <SunIcon />}
							</Button>

							{user ? (
								<Menu>
									<MenuButton
										as={Button}
										rounded={"full"}
										variant={"link"}
										cursor={"pointer"}
										minW={0}
									>
										<Avatar
											size={"sm"}
											src={`https://avatars.dicebear.com/api/male/${user.uid}.svg`}
										/>
									</MenuButton>
									<MenuList alignItems={"center"}>
										<br />
										<Center>
											<Avatar
												size={"2xl"}
												src={`https://avatars.dicebear.com/api/male/${user.uid}.svg`}
											/>
										</Center>
										<br />
										<Center>
											<p>{user.displayName || "User"}</p>
										</Center>
										<br />
										<MenuDivider />
										<MenuItem>Your Servers</MenuItem>
										<MenuItem>Account Settings</MenuItem>
										<MenuItem onClick={logout}>Logout</MenuItem>
									</MenuList>
								</Menu>
							) : (
								// Optionally, add a login button or other elements for non-logged-in users
								<Button onClick={signInWithGoogle}>Login with Google</Button>
							)}
						</Stack>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
