import { QueryResolvers } from "./generated/graphql.js";
import { orders } from "./orderDatabase.js";
import { products } from "./productDatabase.js";

export const queries: QueryResolvers = {
  orders: async (_parent, _args, _context) => {
    const userOrders = orders.filter((order) => order.customerId === _args.customerId);
    // Calculate totalSum for each order
    const ordersWithTotalSum = userOrders.map((order) => ({
      ...order,
      totalSum: order.products.reduce((sum, product) => {
        const productInfo = products.find((p) => p.ean === product.ean);
        if (productInfo) {
          return sum + productInfo.price * product.amount;
        }
        return sum;
      }, 0),
    }));
    return ordersWithTotalSum;
  },
  products: async (_parent, _args, _context) => {
    return products;
  },
};
