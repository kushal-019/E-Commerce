import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../Context/Context";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../Firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import Loader from "../Components/Loader";

const Login = () => {

    const context = useContext(Context);
    const { loading, setloading } = context;

    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const userLoginButton = async() => {
        if (userLogin.email === '' || userLogin.password === '') return toast.error("Enter all the values");
        setloading(true);
        try {
            const users =  await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

            try {
                const q = query(
                    collection(firestore, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, QuerySnapshot => {
                    let user;
                    QuerySnapshot.forEach((doc) => {
                        user = doc.data();
                    })
                    localStorage.setItem('users', JSON.stringify(user));
                    setUserLogin({ email: "", password: "" });
                    toast.success("Login Successfull");
                    setloading(false);
                    if (user.role === 'user') {
                        navigate("/userdashboard")
                    }
                    else navigate("/admin")

                })
                return () => data;
            }
            catch (error) {
                console.log(error);
                setloading(false);
            }


        }
        catch (error) {
            console.log(error);
            setloading(false);
            toast.error("Login Failed");
        }
    }


    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            {/* Login Form  */}
            <div className="login_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Login
                    </h2>
                </div>

                {/* Input Two  */}
                <div className="mb-3">
                    <input
                        type="email"
                        value={userLogin.email}
                        onChange={(e) => {
                            setUserLogin({ ...userLogin, email: e.target.value });
                        }}
                        placeholder='Email Address'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Three  */}
                <div className="mb-5">
                    <input
                        type="password"
                        value={userLogin.password}
                        onChange={(e) => {
                            setUserLogin({ ...userLogin, password: e.target.value });
                        }}
                        placeholder='Password'
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={userLoginButton}
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;
