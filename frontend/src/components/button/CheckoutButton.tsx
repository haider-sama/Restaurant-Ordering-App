import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import UserProfileForm, { UserFormData } from "../forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/my-user-api";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();
  const { pathname } = useLocation();
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: pathname },
    });
  };

  if (isAuthLoading || isLoading || !currentUser) {
    return <LoadingButton />;
  }

  if (!isAuthenticated) {
    return (
      <Button onClick={handleLogin} className="bg-orange-400 flex-1">
        Login to check out
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-400 flex-1">
          Proceed to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-100">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          buttonText="Proceed to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
