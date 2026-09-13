import { useState } from "react";
import authService from "../appwrite/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice.js";
import { Button, Input, Logo } from "../components/index.js";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState(null);

    const signup = async (data) => {
        setError(null);
        try {
            const session = await authService.createAccount(data.email, data.password, data.name);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <div className="flex itmes-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-8 border border-black/10">
                <span className="inline-block w-full max-w-25">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold">Create your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Alerady have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-300 hover:underline"
                >
                    Log In
                </Link>
            </p>
            {error && (
                <p className="text-red-600 mt-8 text-center">
                    {error}
                </p>
            )}
            <form
                onSubmit={handleSubmit(signup)}
                className="mt-8"
            >
                <div className="space-y-5">
                    <Input
                        label="Name: "
                        placeholder="Enter your name: "
                        { ...register("name", { required: true }) }
                    />
                    <Input
                        label="Email: "
                        placeholder="Enter your email: "
                        type="email"
                        { ...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Please enter a valid email address",
                            }
                        }) }
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        { ...register("password", { required: true }) }
                    />
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Create Account
                </Button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
