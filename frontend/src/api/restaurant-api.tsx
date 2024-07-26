import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    if (!restaurantId) {
      throw new Error("Restaurant ID is required");
    }

    const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);

    if (!response.ok) {
      throw new Error(`Failed to get restaurant: ${response.statusText}`);
    }

    return response.json();
  };

  const { data: restaurant, isLoading, isError, error } = useQuery(
    ["fetchRestaurant", restaurantId],
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId, // Only fetch if restaurantId is provided
    }
  );

  return { restaurant, isLoading, isError, error };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Failed to search restaurants: ${response.statusText}`);
    }

    return response.json();
  };

  const { data: results, isLoading, isError, error } = useQuery(
    ["searchRestaurants", searchState, city],
    createSearchRequest,
    {
      enabled: !!city, // Only fetch if city is provided
      keepPreviousData: true, // Keep previous data while new data is loading
    }
  );

  return {
    results,
    isLoading,
    isError,
    error,
  };
};
