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
import {
	getFirestore,
	collection,
	getDocs,
	where,
	query,
} from "firebase/firestore";

export const auth = getAuth(firebase_app);
const functions = getFunctions();
export const storage = getStorage();
export const firestore = getFirestore();

connectFunctionsEmulator(functions, "127.0.0.1", 5001);

// auth functions
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

// https callable
export const createUser = httpsCallable(functions, "createUser");
export const createAdmin = httpsCallable(functions, "createAdmin");
export const deleteUsers = httpsCallable(functions, "deleteUsers");

// firestore refs
export const studentRef = collection(firestore, "student");
export const facultyRef = collection(firestore, "faculty");

// firestore fetch
async function getUserByEmail(email, collectionRef) {
	const q = query(collectionRef, where("email", "==", email));
	let result = null,
		error = null;

	try {
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			return { result, error };
		}

		const userData = querySnapshot.docs[0].data();
		const userDocId = querySnapshot.docs[0].id;
		result = { userData, userDocId };
	} catch (err) {
		error = err;
	}

	return { result, error };
}

export async function getFacultyByEmail(email) {
	return await getUserByEmail(email, facultyRef);
}

export async function getStudentByEmail(email) {
	return await getUserByEmail(email, studentRef);
}

export async function getStudentsByFilters(startYear, course) {
	let result = null,
		error = null;

	let q = query(
		studentRef,
		where("startYear", "==", startYear),
		where("course", "==", course)
	);

	try {
		const querySnapshot = await getDocs(q);

		if (querySnapshot.empty) {
			return { result, error };
		}

		let studentIds = [];
		let studentsData = [];

		querySnapshot.docs.forEach((doc) => {
			let id = doc.id;
			let data = doc.data();

			studentIds.push(id);
			studentsData.push(data);
		});

		result = { studentIds, studentsData };
	} catch (err) {
		error = err;
	}

	return { result, error };
}
