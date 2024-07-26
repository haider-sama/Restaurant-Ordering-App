import { Order } from "@/types/types";
import { Progress } from "../ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  // Function to calculate the expected delivery time
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime);

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedHours = hours < 10 ? `0${hours}` : hours;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${paddedHours}:${paddedMinutes}`;
  };

  // Function to get order status information
  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((status) => status.value === order.status) || ORDER_STATUS[0]
    );
  };

  const { label, progressValue } = getOrderStatusInfo();

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-4 md:flex-row md:justify-between">
        <span>Order Status: {label}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className="animate-pulse"
        value={progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;