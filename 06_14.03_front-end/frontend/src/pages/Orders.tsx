import { useEffect, useState } from "react";
import { Order } from "../models/Order";


function Orders() {
  const[orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/orders")
      .then(res => res.json())
      .then(json => setOrders(json))
    
  }, []);

  return (
    <div>
      {orders.map(order =>
        <div key = {order.id}>
          <div>ID: {order.id}</div>
          <div>Created: {order.created?.toString()}</div>
          <div>Orderer email: {order.person?.email}</div>
          <div>Totalsum: {order.totalSum}</div>
          <div>{order.products?.map(product =>
            <div key = {product.id}>               
              <div>{product.name}</div>
              <div>{product.price}eur</div>
           </div>
          )}</div>
        </div>
      )}
    </div>
  )
}

export default Orders

// iga mapi sisse on keyd vaja