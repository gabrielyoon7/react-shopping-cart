import { useRecoilState } from 'recoil';
import type { Cart, NewCartItem, ProductItem } from '../types/types';
import { cartState } from '../recoil/cartAtoms';
import { fetchAddCart, fetchDeleteCart, fetchUpdateCart } from '../api/api';

function useCart() {
  const [cartList, setCartList] = useRecoilState(cartState);

  const getQuantityByProductId = (id: number) => {
    const targetCart = cartList.find((cart) => cart.id === id);
    return targetCart?.quantity ?? 0;
  };

  const addCart = (product: ProductItem) => {
    if (cartList.find((cartItem) => cartItem.id === product.id) === undefined) {
      const newCartItem: NewCartItem = { id: product.id, quantity: 1, product };
      setCartList([...cartList, newCartItem]);
      fetchAddCart(newCartItem);
    }
  };

  const removeCart = (id: number) => {
    const removedCartList = cartList.filter((cart) => cart.id !== id);
    setCartList(removedCartList);
    fetchDeleteCart(id);
  };

  const updateCartListQuantity = (cartList: Cart[], id: number, newQuantity: number) => {
    const targetIndex = cartList.findIndex(cartItem => cartItem.id === id);
    const targetCart = cartList[targetIndex];
    const updatedCart = {
      ...targetCart,
      quantity: newQuantity
    }
    cartList[targetIndex] = updatedCart;
    return cartList;
  }

  const setCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeCart(id);
    } else {
      const changedCartList = updateCartListQuantity([...cartList], id, quantity);
      setCartList(changedCartList);
      fetchUpdateCart(id, quantity);
    }
  };

  const increaseCart = (id: number) => {
    setCartQuantity(id, getQuantityByProductId(id) + 1);
  };

  const decreaseCart = (id: number) => {
    setCartQuantity(id, getQuantityByProductId(id) - 1);
  };

  return {
    cartList,
    getQuantityByProductId,
    addCart,
    increaseCart,
    decreaseCart,
    setCartQuantity,
  };
}
export default useCart;
