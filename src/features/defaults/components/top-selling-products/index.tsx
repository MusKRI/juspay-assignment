import * as m from "motion/react-client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { formatCurrency } from "@/lib/currency-utils";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  amount: number;
}

const PRODUCT_DATA: Product[] = [
  {
    id: "1",
    name: "ASOS Ridley High Waist",
    price: 79.49,
    quantity: 82,
    amount: 6518.18,
  },
  {
    id: "2",
    name: "Marco Lightweight Shirt",
    price: 128.5,
    quantity: 37,
    amount: 4754.5,
  },
  {
    id: "3",
    name: "Half Sleeve Shirt",
    price: 39.99,
    quantity: 64,
    amount: 2559.36,
  },
  {
    id: "4",
    name: "Lightweight Jacket",
    price: 20.0,
    quantity: 184,
    amount: 3680.0,
  },
  {
    id: "5",
    name: "Marco Shoes",
    price: 79.49,
    quantity: 64,
    amount: 1965.81,
  },
];

export function TopSellingProducts() {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.8 }}
      className="p-6 relative flex flex-col gap-4 bg-primary-light rounded-[16px]"
    >
      <h3 className="text-sm font-semibold text-card-foreground">
        Top Selling Products
      </h3>

      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border/30 hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs py-3 px-0">
                Name
              </TableHead>
              <TableHead className="text-muted-foreground text-xs py-3 px-0">
                Price
              </TableHead>
              <TableHead className="text-muted-foreground text-xs py-3 px-0">
                Quantity
              </TableHead>
              <TableHead className="text-muted-foreground text-xs py-3 px-0 text-right">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PRODUCT_DATA.map((product) => (
              <TableRow
                key={product.id}
                className="border-b border-border/30 hover:bg-accent/50"
              >
                <TableCell className="text-card-foreground py-4 px-0 text-xs">
                  {product.name}
                </TableCell>
                <TableCell className="text-card-foreground py-4 px-0 text-xs">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell className="text-card-foreground py-4 px-0 text-xs">
                  {product.quantity}
                </TableCell>
                <TableCell className="text-card-foreground py-4 px-0 text-xs text-right">
                  {formatCurrency(product.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </m.div>
  );
}
