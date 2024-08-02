// import React, { createContext, useState, useEffect } from 'react';
// import { Cart } from '../interfaces/Cart';

// interface CartContextProps {
//   cart: Cart[];
//   setCart: React.Dispatch<React.SetStateAction<Cart[]>>;
// }

// export const CartContext = createContext<CartContextProps>({
//   cart: [],
//   setCart: () => {},
// });

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<Cart[]>(() => {
//     const savedCart = localStorage.getItem('cart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   return (
//     <CartContext.Provider value={{ cart, setCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
