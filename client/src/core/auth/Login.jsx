import { useNavigate } from "react-router-dom";
import "../../assets/css/auth.css";
import logIn from "../../assets/img/sammy-29.png";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";
import toast from 'react-hot-toast';

const Login = () => {
    const { setIsLoggedIn, setAuthUser } = useContext(GlobalContext);

    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        const bodyData = {
            email: e.target[0].value,
            password: e.target[1].value
        }

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, bodyData, {
            withCredentials: true
        })
            .then(({ data }) => {
                toast.success(data.message)
                localStorage.setItem("token", data.token);
                localStorage.setItem("refreshtoken", data.refreshToken);
                setIsLoggedIn(true);
                setAuthUser({
                    userid: data.user._id,
                    username: data.user.username,
                    name: data.user.name,
                    role: data.user.role,
                    email: data.user.email,
                    phone: data.user.phone,
                    referredUsers: data.user.referredUsers,
                    OrderHistory: data.user.OrderHistory
                })
                navigate("/")

            })
            .catch((err) => console.log({ err }));
    }

    return (
        <>
            <div className="overall">
                <div className="form-container sign-in-form" id="vanish">
                    <div className="form-box sign-in-box">
                        <h2>Login</h2>
                        <form onSubmit={submitHandler}>
                            <div className="field">
                                <i className="fa-solid fa-at"></i>
                                <input type="email" id="text1" name="email" placeholder="Email" required />
                            </div>

                            <div className="field">
                                <i className="fa-solid fa-key"></i>
                                <input className="pass-input" type="password" name="password" placeholder="Enter password" required />
                                <div className="eye-btn" >
                                    <i className="fa-solid fa-eye-slash"></i>
                                </div>
                            </div>

                            <input type="submit" className="submit-btn" value="Login" />
                        </form>

                    </div>
                    <div className="imgBox sign-in-imgBox">
                        <div className="sliding-link">
                            <p>Don&apos;t have an account?</p>
                            <span className="sign-up-btn" onClick={() => { navigate("/signup") }}>Sign up</span>
                        </div>
                        <img src={logIn} alt="" />
                    </div>
                </div>
            </div>

        </>

    );
};

export default Login;
