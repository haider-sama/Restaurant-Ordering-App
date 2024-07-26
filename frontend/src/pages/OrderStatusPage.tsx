import { useGetMyOrders } from "@/api/order-api";
import OrderStatusDetail from "@/components/order/OrderStatusDetail";
import OrderStatusHeader from "@/components/order/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!orders || orders.length === 0) {
    return <span>No orders found!</span>;
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div key={order.id} className="space-y-10 bg-gray-100 p-12 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={order.restaurant.imageUrl}
                alt={`${order.restaurant.name} image`}
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusPage;
