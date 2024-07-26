import { Restaurant } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-slate-200 border rounded-md shadow-sm">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription className="text-lg text-slate-600">
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {restaurant.cuisines.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-sm text-slate-600">{item}</span>
            {index < restaurant.cuisines.length - 1 && (
              <Dot className="mx-2 text-slate-400" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
