import { Order } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/order`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }

      return response.json();
    } catch (error: any) {
      throw new Error(`Error fetching orders: ${error.message}`);
    }
  };

  const { data: orders, isLoading, error } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest,
    {
      refetchInterval: 5000, // Refresh orders every 5 seconds
    }
  );

  if (error) {
    toast.error(error.toString());
  }

  return { orders, isLoading, error };
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkoutSessionRequest),
        }
      );

      if (!response.ok) {
        throw new Error(`Unable to create checkout session: ${response.statusText}`);
      }

      return response.json();
    } catch (error: any) {
      throw new Error(`Error creating checkout session: ${error.message}`);
    }
  };

  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(createCheckoutSessionRequest, {
    onSuccess: () => {
      toast.success("Checkout session created successfully!");
    },
    onError: (error: any) => {
      toast.error(`Unable to create checkout session: ${error.message}`);
      reset();
    },
  });

  return {
    createCheckoutSession,
    isLoading,
    isError,
    isSuccess,
  };
};
