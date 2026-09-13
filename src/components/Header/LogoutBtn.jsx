import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth.js";
import { logout } from "../../store/authSlice.js";

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        await authService.logout();
        dispatch(logout);
    };

    return (
        <button
            className="inline-block px-6 py-2 duration-300 hover:bg-blue-100 rounded-full"
        >Logout</button>
    );
};

export default LogoutBtn;
