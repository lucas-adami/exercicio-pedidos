export interface IOrders {
  id?: number;
  order_date: string;
  client_document: string;
  payment_type: string;
  quantity: number;
  total_value: number;
}
