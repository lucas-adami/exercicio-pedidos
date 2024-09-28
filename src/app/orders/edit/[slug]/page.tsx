"use client";

import EditTemplate from "@/components/templates/order/EditTemplate";

interface OrderEditProps {
  params: { slug: string };
}

const OrderEdit: React.FC<OrderEditProps> = ({ params }) => {
  //<div>{params.slug}</div>
  return <EditTemplate />;
};

export default OrderEdit;
