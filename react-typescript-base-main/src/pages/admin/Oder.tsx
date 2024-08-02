// import React, { useEffect, useState } from "react";

// const AdminOrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   useEffect(() => {
//     const orderHistory = JSON.parse(
//       localStorage.getItem("orderHistory") || "[]"
//     );
//     setOrders(orderHistory);
//   }, []);

//   const handleViewItems = (order) => {
//     setSelectedOrder(order);
//   };

//   return (
//     <div className="container">
//       <h1 className="mt-5">Order History</h1>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <>
//           <table className="table mt-3 table-bordered">
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Date</th>
//                 <th>Customer Name</th>
//                 <th>Address</th>
//                 <th>Phone</th>
//                 <th>Total Items</th>
//                 <th>Total Price</th>
//                 <th>Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order.id}>
//                   <td>{order.id}</td>
//                   <td>{order.date}</td>
//                   <td>{order.customerInfo.name}</td>
//                   <td>{order.customerInfo.address}</td>
//                   <td>{order.customerInfo.phone}</td>
//                   <td>{order.items.length}</td>
//                   <td>
//                     $
//                     {order.items.reduce(
//                       (total, item) => total + item.price * item.quantity,
//                       0
//                     )}
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handleViewItems(order)}
//                     >
//                       View Items
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {selectedOrder && (
//             <div className="mt-5">
//               <h2>Order Details</h2>
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>Product</th>
//                     <th>Image</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedOrder.items.map((item) => (
//                     <tr key={item.id}>
//                       <td>{item.title}</td>
//                       <td>
//                         <img
//                           width={100}
//                           src={item.thumbnail}
//                           alt={item.title}
//                         />
//                       </td>
//                       <td>{item.quantity}</td>
//                       <td>{item.price}</td>
//                       <td>{item.price * item.quantity}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AdminOrdersPage;
