import {
    useCreateMyRestaurant,
    useGetMyRestaurant,
    useGetMyRestaurantOrders,
    useUpdateMyRestaurant,
  } from "@/api/my-restaurant-api";
import OrderItemCard from "@/components/order/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/components/forms/manage-restaurant-form/ManageRestaurantForm";
  
  const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { restaurant } = useGetMyRestaurant();
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant();
    const { orders, isLoading: isOrdersLoading } = useGetMyRestaurantOrders();
  
    const isEditing = !!restaurant;
    const isLoading = isCreateLoading || isUpdateLoading || isOrdersLoading;
  
    return (
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="space-y-6 bg-gray-100 p-12 rounded-lg"
        >
          <h2 className="text-2xl font-bold">
            {orders ? `${orders.length} active orders` : "Loading..."}
          </h2>
          {isOrdersLoading ? (
            <p>Loading orders...</p>
          ) : orders?.length === 0 ? (
            <p>No active orders found!</p>
          ) : (
            orders?.map((order) => (
              <OrderItemCard key={order.id} order={order} />
            ))
          )}
        </TabsContent>
        <TabsContent value="manage-restaurant">
          <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    );
  };
  
export default ManageRestaurantPage;
  