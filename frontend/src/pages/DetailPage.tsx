import { useGetRestaurant } from "@/api/restaurant-api";
import MenuItem from "@/components/menu/MenuItem";
import OrderSummary from "@/components/order/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "@/types/types";
import CheckoutButton from "@/components/button/CheckoutButton";
import { UserFormData } from "@/components/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/order-api";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [restaurantId]);

  const updateCartItems = (items: CartItem[]) => {
    setCartItems(items);
    sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(items));
  };

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      const updatedCartItems = existingCartItem
        ? prevCartItems.map((cartItem) =>
            cartItem._id === menuItem._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [
            ...prevCartItems,
            {
              _id: menuItem._id,
              name: menuItem.name,
              price: menuItem.price,
              quantity: 1,
            },
          ];

      updateCartItems(updatedCartItems);
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => item._id !== cartItem._id
      );

      updateCartItems(updatedCartItems);
      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    try {
      const checkoutData = {
        cartItems: cartItems.map((cartItem) => ({
          menuItemId: cartItem._id,
          name: cartItem.name,
          quantity: cartItem.quantity.toString(),
        })),
        restaurantId: restaurant._id,
        deliveryDetails: {
          name: userFormData.name,
          addressLine1: userFormData.addressLine1,
          city: userFormData.city,
          country: userFormData.country,
          email: userFormData.email as string,
        },
      };

      const { url } = await createCheckoutSession(checkoutData);
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!restaurant) {
    return <span>Restaurant not found</span>;
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
