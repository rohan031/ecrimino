import firebase_app from "../config";
import { getStorage, ref } from "firebase/storage";
import {
	signInWithEmailAndPassword,
	getAuth,
	sendEmailVerification,
	signOut,
	browserSessionPersistence,
	setPersistence,
} from "firebase/auth";
import {
	getFunctions,
	httpsCallable,
	connectFunctionsEmulator,
} from "firebase/functions";

export const auth = getAuth(firebase_app);
const functions = getFunctions();
export const storage = getStorage();

// connectFunctionsEmulator(functions, "127.0.0.1", 5001);

export async function signIn(email, password) {
	let result = null,
		error = null;

	try {
		await setPersistence(auth, browserSessionPersistence);
		result = await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		error = err;
	}

	return { result, error };
}

export async function resendEmailVerification() {
	let user = auth.currentUser;

	try {
		await sendEmailVerification(user);
	} catch (e) {
		console.log(e);
	}
}

export const addAdminRole = httpsCallable(functions, "addAdminRole");
export const createUser = httpsCallable(functions, "createUser");

export const getUser = () => {
	return auth?.currentUser;
};

export async function signoutUser() {
	let result = null,
		error = null;

	try {
		await signOut(auth);
		result = "success";
	} catch (err) {
		error = err;
	}

	return { result, error };
}
