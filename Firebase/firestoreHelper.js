import { collection, addDoc,doc, deleteDoc  } from "firebase/firestore"; 
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
    try {
        await addDoc(collection(database, collectionName), data);
    } catch (err) {
        console.log(err);
    }
}

export async function deleteFromDb(key, collectionName) {
    try {
        deleteDoc(doc(database, collectionName, key));
    } catch (err) {
        console.log(err);
    }
}