/* eslint-disable react/no-unescaped-entities */
import { useContext  , useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../Context/Context";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../Firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import  Loader from "../Components/Loader";


const Signup = () => {
    const context = useContext(Context);

    const {loading  , setloading} = context;

    const navi = useNavigate();

    const [usersignup , setUserSignup] = useState({role : "user" , name : "" , email : "" , password : ""});

    const UserSignupFunc=async()=>{
        if(usersignup.name === "" || usersignup.password === "" || usersignup.email === "")toast.error("All fields are required") ;

        setloading(true);

        try{
            const users = await createUserWithEmailAndPassword(auth , usersignup.email, usersignup.password);
            const user = {
                name : usersignup.name, 
                uid : users.user.uid,
                email : usersignup.email,
                role : usersignup.role,
                time : Timestamp.now(),
                date : new Date().toLocaleString(
                    "en-US", {month:"short" , day : "2-digit" , year : "numeric",}
                )
                
            }
            // this is the referce of location "user" where data is stored
            const userRef = collection(firestore , "user");  // here user name collection is created in firestore named database that we created in firebase 
            // userRef is the address or reference of that location , "user" collection 

            // this is to add required data at the userRef -> desired location
            addDoc(userRef , user); // we added "user" data at userRef location

            setUserSignup({
                name: "",
                email: "",
                password: "",
            })

            toast.success("Signup Successfully");

            setloading(false);
            navi('/login')
         }
        catch(error){
            console.log(error);
            setloading(false);
        }
    }
  
    
    
    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            {/* signup Form  */}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Signup
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="text"
                        onChange={(e)=>{
                            setUserSignup({...usersignup , name: e.target.value});
                        }} 
                        value = {usersignup.name}
                        placeholder='Full Name'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        placeholder='Email Address'
                        value = {usersignup.email}
                        onChange={(e)=>{
                            setUserSignup({...usersignup , email: e.target.value});
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value = {usersignup.password}
                        onChange={(e)=>{
                            setUserSignup({...usersignup , password: e.target.value});
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={UserSignupFunc}
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Signup
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Have an account <Link className=' text-pink-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Signup;