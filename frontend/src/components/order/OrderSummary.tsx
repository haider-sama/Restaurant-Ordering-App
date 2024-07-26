import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types/types";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  // Calculate the total cost including delivery
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };

  // Calculate individual item total cost
  const getItemTotalCost = (item: CartItem) => (item.price * item.quantity) / 100;

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between mx-auto max-w-lg">
          <span>Your Order {""}</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 mx-auto max-w-lg">
        {cartItems.map((item) => (
          <div key={item.name} className="flex justify-between items-center">
            <span className="flex items-center">
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-2">
              <Trash
                className="cursor-pointer text-red-400"
                size={20}
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => removeFromCart(item)}
              />
              ${getItemTotalCost(item).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between items-center">
          <span>Delivery</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;