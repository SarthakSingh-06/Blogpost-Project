import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth.js";
import { login, logout } from "./store/authSlice.js";
import { Header, Footer } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch= useDispatch();

    useEffect(() => {
        authService.getCurrentUser()
        .then((data) => {
                dispatch(login({userData: data}));
        })
        .catch((error) => {
            dispatch(logout());
        })
        .finally(() => setLoading(false));
    }, []);

    // conditional rendering based on loading state
    return loading ? (
        <div></div>
    ) : (
        <div
            className="min-h-screen flex flex-wrap content-between bg-gray-400"
        >
            <div
                className="w-full block"
            >
                <Header />
                <main>
                    TODO Outlet
                    {/* <Outlet /> */}
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;
