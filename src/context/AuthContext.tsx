import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase"; // Adjust this import path to where your Firebase auth instance is initialized

// Define the shape of the context
interface AuthContextType {
	user: User | null;
	logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

// Context provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		// Listener for changes in auth state
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	// Logout function
	const logout = async () => {
		await signOut(auth);
	};

	return (
		<AuthContext.Provider value={{ user, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

// Hook for easy context consumption
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
