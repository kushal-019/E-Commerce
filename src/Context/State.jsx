import { useEffect, useState } from "react";
import Context from "./Context";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import { firestore } from "../Firebase/FirebaseConfig";

const State =({children})=>{
    const [loading , setloading] = useState(false);

    const [products , setProducts] = useState([]);

    const getAllProduct=async()=>{
        setloading(true)
        try {
            const q = query(collection ( firestore , "products") , orderBy("time"))

            const data = onSnapshot(q , (QuerySnapshot)=>{
                let productArray = [];
                QuerySnapshot.forEach((doc)=>{
                    productArray.push({...doc.data()  , id: doc.id});
                })
                setProducts(productArray);
                setloading(false);
            })
            return ()=>data;
        } 
        catch (error) {
            console.log(error);
            setloading(false);
        }
    }


    const [getAllOrder, setGetAllOrder] = useState([]);

    const getAllOrderFunction = async () => {
        setloading(true);
        try {
            const q = query(
                collection(firestore, "order"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrder(orderArray);
                setloading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setloading(false);
        }
    }

    
    const deleteProduct = async (id) => {
        setloading(true)
        try {
            await deleteDoc(doc(firestore, 'order', id))
            toast.success('Order Deleted successfully')
            getAllOrderFunction();
            setloading(false)
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    const [getAllUser, setGetAllUser] = useState([]);

    const getAllUserFunction = async () => {
        setloading(true);
        try {
            const q = query(
                collection(firestore, "user"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let userArray = [];
                QuerySnapshot.forEach((doc) => {
                    userArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllUser(userArray);
                setloading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setloading(false);
        }
    }
    

    useEffect(()=>{
        getAllProduct();
        getAllOrderFunction();
        getAllUserFunction();
    }, [])
    return (
        <Context.Provider value={{loading  , setloading , products , getAllProduct , getAllOrder ,deleteProduct , getAllUser}}>
            {children}
        </Context.Provider>
    )
}
export default State;