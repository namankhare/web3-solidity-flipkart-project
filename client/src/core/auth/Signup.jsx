import "../../assets/css/auth.css";
import signUp from "../../assets/img/sammy-25.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    return (<div className="form-container sign-up-form">
        <div className="imgBox sign-up-imgBox">
            <div className="sliding-link">
                <p>Already have an account?</p>
                <span className="sign-in-btn" onClick={() => { navigate("/login") }}>Sign in</span>
            </div>
            <img src={signUp} alt="" />
        </div>
        <div className="form-box sign-up-box">
            <h2>Sign up</h2>

            <form action="/signup" method="post">
                <div className="field">
                    <i className="fa-solid fa-at"></i>
                    <input type="email" name="email" placeholder="Enter email ID" required />
                </div>
                <div className="field">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" name="name" placeholder="Enter your name" required />
                </div>
                <div className="field">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" name="username" placeholder="Enter username" required />
                </div>
                <div className="field">
                    <i className="fa-solid fa-key"></i>
                    <input type="password" name="password" placeholder="Enter password" required />

                </div>
                <div className="field">
                    <i className="fa-solid fa-key"></i>
                    <input type="password" name="confirm-password" placeholder="Confirm password" required />

                </div>

                <input type="submit" className="submit-btn" value="Sign up" />
            </form>



        </div>

    </div>);
};

export default Signup;
