import { auth } from "./firebase_config.js";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import { collection,doc,setDoc,getDoc,updateDoc } from "firebase/firestore";
import { db } from "./firebase_config.js";

export const registerUser = async (email,password) => {
    try {
        const userCredential= await createUserWithEmailAndPassword(auth,email,password);
        const user=userCredential.user;

        const userRef=doc(collection(db,'users'),user.uid);
        await setDoc(userRef,{email:user.email});
        
        console.log("User registered and email saved:", user.email);
        return user.uid;
    }catch(error) {
        console.error("Error registering user:", error.message);
        return null;
    }
};

export const loginUser = async(email,password) => {
    try {
        
        const userCredential=await signInWithEmailAndPassword(auth,email,password);
        const user=userCredential.user;
        console.log("Authenticated user ID:", user.uid);

        const userRef=doc(db,"users",user.uid);
        const userDoc=await getDoc(userRef);

        if(!userDoc.exists()) {
            console.log("User not registered. Please register.");
            return null;
        }
        else{
            console.log("User logged in. ");
            return user.uid;
        }
        
    }
    catch(error){
        console.error("Error logging in. ", error.message);
        return null;
    }
};

export const addMoreUserDetails=async(userId,additionalDetails) => {
    try {
       if(!userId) {
        throw new Error("User ID is required. ");
       }

        const useRef = doc(db,'users',userId);
        await updateDoc(useRef,additionalDetails);
        console.log('Additional user details saved. ');
        
    }catch(error) {
             console.error("Error updating document. ",error.message);
    }
};

export const handleRegistration =async(email,password,additionalDetails) => {
    try {
        const userId = await registerUser(email,password);

        if(userId) {
            await addMoreUserDetails(userId,additionalDetails);
            return userId
        }
    }catch (error) {
        console.error("Error during registration process:",error.message);
        return null;
    }
}; 
