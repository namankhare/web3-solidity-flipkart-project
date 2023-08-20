import "../../assets/css/auth.css";
import signUp from "../../assets/img/sammy-25.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();

    const submitHandler = async(e) => {
        e.preventDefault();
        const bodyData = {
            email: e.target[0].value,
            name: e.target[1].value,
            username: e.target[2].value,
            password: e.target[3].value,
            confirmPassword: e.target[4].value
        }

        console.log(bodyData);
    }

    return (
        <div className="overall">
            <div className="form-container sign-up-form">
        <div className="imgBox sign-up-imgBox">
            <div className="sliding-link">
                <p>Already have an account?</p>
                <span className="sign-in-btn" onClick={() => { navigate("/login") }}>Sign in</span>
            </div>
            <img src={signUp} alt="" />
        </div>
        <div className="form-box sign-up-box">
            <h2 style={{marginBottom:"10px"}}>Sign up</h2>

            <form onSubmit={submitHandler}>
            <div className="check">
            <button type="button" className="btn btn-warning" style={{fontSize:"small"}}>Connect Wallet</button>
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
                    <i className="fa-solid fa-at"></i>
                    <input type="email" name="email" placeholder="Enter email ID" required />
                </div>
                
                <div className="field">
                    <i className="fa-solid fa-key"></i>
                    <input type="password" name="password" placeholder="Enter password" required />

                </div>
                <div className="field">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" name="username" placeholder="Referral Id (If applicable)" required />
                </div>

                <div className="field" style={{display:"inline-flex",gap:"1rem"}}>
                <input type="radio" id="html" name="role" value="0"/>
                <label for="html">Buyer</label>
                <input type="radio" id="html" name="role" value="1"/>
                <label for="html">Seller</label>
                <input type="radio" id="html" name="role" value="3"/>
                <label for="html">Partner</label>
                </div>

                
                

                <input type="submit" className="submit-btn" value="Sign up" />
            </form>



        </div>

    </div>
        </div>
    );
};

export default Signup;
