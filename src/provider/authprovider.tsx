import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { auth, db } from "../firebase"; // Adjust this import path as necessary
import {
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface User {
	uid: string;
	displayName: string | null;
}

interface AuthContextType {
	user: User | null;
	logout: () => Promise<void>;
	signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				const { uid, displayName } = firebaseUser;
				const user: User = { uid, displayName };
				setUser(user);
				// Call createUserCollection with both uid and displayName
				await createUserCollection(uid, displayName);
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const signInWithGoogle = async () => {
		await signInWithPopup(auth, new GoogleAuthProvider());
	};

	const logout = async () => {
		await signOut(auth);
	};

	return (
		<AuthContext.Provider value={{ user, logout, signInWithGoogle }}>
			{children}
		</AuthContext.Provider>
	);
};

const createUserCollection = async (
	userId: string,
	displayName: string | null
) => {
	const userRef = doc(db, "users", userId);
	const docSnap = await getDoc(userRef);
	if (!docSnap.exists()) {
		await setDoc(userRef, { uid: userId, displayName }); // Save displayName along with uid
	}
};
