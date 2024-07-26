import { Order, Restaurant } from "@/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get restaurant: ${response.statusText}`);
      }

      return response.json();
    } catch (error: any) {
      throw new Error(`Error fetching restaurant: ${error.message}`);
    }
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
      });

      if (!response.ok) {
        throw new Error(`Failed to create restaurant: ${response.statusText}`);
      }

      return response.json();
    } catch (error: any) {
      throw new Error(`Error creating restaurant: ${error.message}`);
    }
  };

  const {
    mutate: createRestaurant,
    isLoading,
  } = useMutation(createMyRestaurantRequest, {
    onSuccess: () => {
      toast.success("Restaurant created!");
    },
    onError: (error: any) => {
      toast.error(`Unable to create restaurant: ${error.message}`);
    },
  });

  return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
      });

      if (!response.ok) {
        throw new Error(`Failed to update restaurant: ${response.statusText}`);
      }

      return response.json();
    } catch (error: any) {
      throw new Error(`Error updating restaurant: ${error.message}`);
    }
  };

  const {
    mutate: updateRestaurant,
    isLoading,
  } = useMutation(updateRestaurantRequest, {
    onSuccess: () => {
      toast.success("Restaurant updated!");
    },
    onError: (error: any) => {
      toast.error(`Unable to update restaurant: ${error.message}`);
    },
  });

  return { updateRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
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

  const { data: orders, isLoading } = useQuery(
    "fetchMyRestaurantOrders",
    getMyRestaurantOrdersRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    try {
      const accessToken = await getAccessTokenSilently();

      const response = await fetch(
        `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: updateStatusOrderRequest.status }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      return response.json();
    } catch (error: any) {
      throw new Error(`Error updating order status: ${error.message}`);
    }
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    reset,
  } = useMutation(updateMyRestaurantOrder, {
    onSuccess: () => {
      toast.success("Order updated!");
    },
    onError: (error: any) => {
      toast.error(`Unable to update order: ${error.message}`);
      reset();
    },
  });

  return { updateRestaurantStatus, isLoading };
};
