import { db } from './firebase_config';
import { loginUser } from './auth';
import { collection,doc, getDoc,getDocs,query,updateDoc,where,updateDoc } from "firebase/firestore";

export const check_owner = async(email,password) => {
    try {
        const userId = await loginUser(email, password);

        const userRef = doc(db,'users',userId);
        const userDoc =await getDoc(userRef);

        if(userDoc.exists()){
            const userData = userDoc.data();

            if(userData.isAdmin === "true"){
                console.log("The user is an owner. ");
                return userId;
            }else {
                console.log("The user is not a guest. ")
                return null;
            }
        }else {
            console.error("No user document found. ");
            return null;
        }
        
    }catch (error) {
         console.error("Error checking user ownership. ",error.message);
         return null;
    }
};

export const fetchBoatsByOwner = async(userId) => {
    try {
        const boatsRef=collection(db,'boats');

        const boatsQuery= query(boatsRef,where("ownerId","==",userId));

        const querySnapshot=await getDocs(boatsQuery);

        const boats=querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));

        console.log("Boats owned by the user. ",boats);
        return boats;
    }catch(error) {
        console.error("Error fetching boats by owner. ",error.message);
        return [];
    }
};

export const updateBoatsByOwner = async(boatId,updatedDetails) => {
           try {
            const boatRef=doc(db,'boats',boatId);
            const boatDoc= await getDoc(boatRef);

            if (!boatDoc.exists()) {
                console.error("Boat not found with the provided ID:", boatId);
                return false;
            }

            await updateDoc(boatRef,updatedDetails);
            console.log("Boat details updated",{
                ...boatDoc.data(),
                ...updatedDetails,
           });

            return true;
           } catch(error) {
            console.error("Error updating boat details. ",error.message);
            return false;
           }

};

export const fetchBookingsByOwner = async(userId) => {
        try {
            const bookingsRef = collection(db,'bookings');
            const bookingsQuery = query(bookingsRef,where("ownerId","==",userId));
            const querySnapshot= await getDocs(bookingsQuery);
            const bookings=querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
            
            const groupedBookings = bookings.reduce((acc,booking) => {
                if(!acc[booking.boatId]) {
                    acc[booking.boatId] = [];
                }
                acc[booking.boatId].push(booking);
                return acc;
            }, {});

               console.log("Bookings grouped by boatId", groupedBookings);
               return groupedBookings;

        }catch(error) {
              console.error("Error fetching bookings. ",error.message);
              return [];
        }
};

export const fetchBookingByBoatId = async(boatId) => {
        try {
            const bookingsRef=collection(db,'bookings');
            const bookingQuery=query(bookingsRef,where("boatId","==",boatId),orderBy("date","desc"));
            const querySnapshot= await getDocs(bookingQuery);
            const bookings=querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));
            console.log("Bookings of the boat sorted by date(desc). ",bookings);
            return bookings;
        }catch(error) {
            console.error("Error fetching bookings. ")
            return [];
      }
};

export const fetchCurrentlyBookedBoatsByOwner = async(userId) => {
    try {
        const bookingsRef=collection(db,'bookings');
        const bookingsQuery = query(bookingsRef, where("ownerId","==",userId),orderBy("date","desc"));
        const querySnapshot= await getDocs(bookingsQuery);

        const groupedBookings = querySnapshot.docs.reduce((acc, doc) => {
            const booking = { id: doc.id, ...doc.data() };
            if (!acc[booking.boatId]) {
                acc[booking.boatId] = [];
            }
            acc[booking.boatId].push(booking);
            return acc;
        }, {});

        const currentlyBookedBoats=[];
        for(const boatId in groupedBookings) {
            const boatRef=doc(db,'boats',boatId);
            const boatDoc= await getDoc(boatRef);

            if(boatDoc.exists() && boatDoc.data().booked === true) {
                currentlyBookedBoats.push(groupedBookings[boatId][0]);
            }
        }
        console.log("Currently booked boats. ",currentlyBookedBoats);
        return currentlyBookedBoats;
    }catch(error) {
        console.error("Error fetching currently booked boats. ",error.message);
        return [];
    }
};