import "../../assets/css/auth.css";
import signUp from "../../assets/img/sammy-25.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { hideMiddleWalletAddress } from "../../helper/helpFunc";
import { toast } from "react-hot-toast";

const Signup = () => {
    const navigate = useNavigate();
    const [signupWalletAddress, setSignupWalletAddress] = useState('')
    const [isSignupWalletConnected, setIsSignupWalletConnected] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault();
        const bodyData = {
            name: e.target[0].value,
            username: e.target[1].value,
            email: e.target[2].value,
            address: e.target[3].value,
            phone: e.target[4].value,
            password: e.target[5].value,
            referredBy: e.target[6].value,
            role: e.target[7].value,
        }

        if (signupWalletAddress !== '') bodyData.walletAddress = signupWalletAddress

        console.log(bodyData);
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, bodyData)
            .then(({ data }) => {
                toast.success(data.message);
                navigate('/login');
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleConnectWallet = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setSignupWalletAddress(accounts[0]);
                setIsSignupWalletConnected(true);
            } else {
                console.log(); ('Metamask not found');
            }
        } catch (error) {
            setSignupWalletAddress('');
            setIsSignupWalletConnected(false);
            console.log(); (`Error connecting to Metamask: ${error.message}`);
        }
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
                    <h2 style={{ marginBottom: "10px" }}>Sign up</h2>
                    <div className="check">
                        {
                            isSignupWalletConnected
                                ?
                                <div className="text-nowrap my-3">Wallet Connected: <span className="p-1 text-white bg-primary rounded-pill">{hideMiddleWalletAddress(signupWalletAddress)}</span></div>
                                :
                                <button type="button" className="btn btn-warning" style={{ fontSize: "small" }} onClick={handleConnectWallet}>Connect Wallet</button>
                        }
                    </div>
                    <form onSubmit={submitHandler}>

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
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="address" placeholder="Enter Your Address" required />
                        </div>

                        <div className="field">
                            <i className="fa-solid fa-user"></i>
                            <input type="number" name="phone" placeholder="Enter Phone No." required />
                        </div>

                        <div className="field">
                            <i className="fa-solid fa-key"></i>
                            <input type="password" name="password" placeholder="Enter password" required />

                        </div>
                        <div className="field">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" name="referrer" placeholder="Referral Id (If applicable)" />
                        </div>

                        <div className="field" style={{ display: "inline-flex", gap: "1rem" }}>
                            <input type="radio" id="html" name="role" value="0" />
                            <label htmlFor="html">User</label>
                            <input type="radio" id="html" name="role" value="1" />
                            <label htmlFor="html">Seller</label>
                            <input type="radio" id="html" name="role" value="2" />
                            <label htmlFor="html">Partner</label>
                        </div>




                        <input type="submit" className="submit-btn" value="Sign up" />
                    </form>



                </div>

            </div>
        </div>
    );
};

export default Signup;
