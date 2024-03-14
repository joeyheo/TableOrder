import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./component/navbar";
import Start from "./pages/start";
import Dashboard from "./pages/dashboard";
import AdminDashboard from "./pages/admin/dashboard";
import { AuthProvider, useAuth } from "./provider/authprovider"; // Adjust this import path as necessary

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user } = useAuth(); // Use the useAuth hook to get the current user
	return user ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
	return (
		<AuthProvider>
			{" "}
			{/* Wrap your application with AuthProvider */}
			<ChakraProvider>
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" element={<Start />} />
						<Route
							path="/dashboard"
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/admin"
							element={
								<ProtectedRoute>
									<AdminDashboard />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</Router>
			</ChakraProvider>
		</AuthProvider>
	);
};

export default App;
