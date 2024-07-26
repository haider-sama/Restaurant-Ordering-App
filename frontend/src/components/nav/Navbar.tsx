import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../ui/button";
import UserMenu from "../menu/UserMenu";

const Navbar = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        <span className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <>
                <UserMenu />
                </>
            ) : (
                <Button onClick={async () => await loginWithRedirect()}
                className="font-semibold rounded-lg text-white bg-slate-800 
                hover:text-slate-600 hover:bg-orange-400"
                variant="ghost">
                    Login
                </Button>
            )}
        </span>
    );
}

export default Navbar;