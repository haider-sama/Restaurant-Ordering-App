import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu } from "../ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const UserMenu = () => {
    const { user, logout } = useAuth0();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-2 font-semibold text-slate-600 hover:text-orange-400 gap-2">
            <CircleUserRound className="text-slate-600" />
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white shadow-md rounded-md p-2">
                <DropdownMenuItem className="mt-2">
                    <Link to="/manage-restaurant"
                    className="font-semibold text-sm text-slate-600 hover:text-orange-400">
                        Manage Restaurant
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="mt-2">
                    <Link to="/user-profile"
                    className="font-semibold text-slate-600 text-sm hover:text-orange-400">
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="mt-2">
                    <Link to="/order-status" className="font-semibold text-slate-600 text-sm hover:text-orange-400">
                        Order Status
                    </Link>
                </DropdownMenuItem>
                <Separator className="my-1"/>
                <DropdownMenuItem className="flex items-center mt-1">
                    <Button onClick={() => logout()}
                    className="flex flex-1 font-semibold bg-slate-800">
                        Log out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserMenu;