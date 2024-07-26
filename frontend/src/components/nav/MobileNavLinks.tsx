import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const MobileNavLinks = () => {
    const { logout } = useAuth0();

    return (
        <>
            <Link to="/order-status"
            className="flex bg-white items-center font-bold hover:text-orange-400">
                Order Status
            </Link>

            <Link to="/manage-restaurant"
            className="flex bg-white items-center font-bold hover:text-orange-400">
                My Restaurant
            </Link>

            <Link to="/user-profile"
            className="flex bg-white items-center font-bold hover:text-orange-400">
                Profile
            </Link>

            <Button onClick={() => logout()}
            className="flex items-center px-3 font-bold hover:bg-slate-600">
                Log out
            </Button>
        </>
    );
}

export default MobileNavLinks;