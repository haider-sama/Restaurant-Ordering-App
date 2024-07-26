import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useAuth0 } from "@auth0/auth0-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    return (
    <Sheet>
        <SheetTrigger>
            <Menu className="text-slate-800" />
        </SheetTrigger>
        <SheetContent className="space-y-3">
            <SheetTitle className="text-center">
                {isAuthenticated ? (
                    <span className="flex items-center font-semibold gap-2">
                        <CircleUserRound className="text-slate-400" />
                        {user?.email}
                    </span>
                ) : (
                    <span> Welcome to MernEats.com!</span>
                )}
            </SheetTitle>
            <Separator />
            <SheetDescription className="flex flex-col gap-4">
                    {isAuthenticated ? (
                        <MobileNavLinks />
                    ) : (
                        <Button className="flex-1 font-bold bg-orange-400"
                        onClick={() => loginWithRedirect()}>
                            Login
                        </Button>
                    )}
            </SheetDescription>
        </SheetContent>
    </Sheet>
    );
}

export default MobileNav;