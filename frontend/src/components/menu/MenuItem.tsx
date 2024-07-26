import { MenuItem } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ShoppingCart } from 'lucide-react';

type MenuItemProps = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: MenuItemProps) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-semibold flex flex-row gap-4 justify-between items-center">
        <span className="flex justify-start">Price: ${(menuItem.price / 100).toFixed(2)}</span>
        <span className="flex items-center gap-2">
            <ShoppingCart className="cursor-pointer text-green-400" size={20}/>
        </span>
      </CardContent>
    </Card>
  );
};

export default MenuItem;