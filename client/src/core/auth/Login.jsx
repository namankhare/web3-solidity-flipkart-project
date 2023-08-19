import { useNavigate } from "react-router-dom";
import "../../assets/css/auth.css";
import logIn from "../../assets/img/sammy-29.png";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";

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
                })
                // setTimeout(() => {
                //     navigate('/')
                // }, 2000);

            })
            .catch((err) => console.log({ err }));
    }

    return (
        <>
            <div className="overall">
            <div class="form-container sign-in-form" id="vanish">
                <div class="form-box sign-in-box">
                    <h2>Login</h2>
                    <form onSubmit={submitHandler}>
                        <div class="field">
                            <i class="fa-solid fa-at"></i>
                            <input type="email" id="text1" name="email" placeholder="Email" required />
                        </div>

                        <div class="field">
                            <i class="fa-solid fa-key"></i>
                            <input class="pass-input" type="password" name="password" placeholder="Enter password" required />
                            <div class="eye-btn" >
                                <i class="fa-solid fa-eye-slash"></i>
                            </div>
                        </div>

                        <input type="submit" class="submit-btn" value="Login" />
                    </form>

                </div>
                <div class="imgBox sign-in-imgBox">
                    <div class="sliding-link">
                        <p>Don't have an account?</p>
                        <span class="sign-up-btn" onClick={() => { navigate("/signup") }}>Sign up</span>
                    </div>
                    <img src={logIn} alt="" />
                </div>
            </div>
            </div>

        </>

    );
};

export default Login;
