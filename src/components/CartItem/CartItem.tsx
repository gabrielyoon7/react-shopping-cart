import type {CartItem} from "../../types/types";
import CartController from "../CartController";
import {
  CartItemControllerWrapper,
  CartItemImage,
  CartItemInfo, CartItemInfoWrapper,
  CartItemLayout,
  CartItemName,
  CartItemPrice,
  CartItemTrashImage
} from "./CartItem.style";
import trashIcon from '../../assets/trash.png';
import useCart from "../../hooks/useCart.ts";
import {ChangeEvent} from "react";
import {useSetRecoilState} from "recoil";
import {removeCartIemSelector} from "../../recoil/cartAtoms.ts";

interface CartItemProps {
  cart: CartItem;
}

function CartItem({cart}: CartItemProps) {

  const {switchCheckbox} = useCart();

  const removeCartItem = useSetRecoilState(removeCartIemSelector(undefined));

  return (
    <CartItemLayout>
      <div>
        <input
          type="checkbox"
          checked={cart.checked}
          onChange={() => {
            switchCheckbox(cart.id);
          }}
        />
      </div>
      <CartItemImage
        src={cart.product.imageUrl}
        onClick={() => {
          switchCheckbox(cart.id);
        }}
      />
      <CartItemInfoWrapper>
        <CartItemInfo>
          <CartItemName
            onClick={() => {
              switchCheckbox(cart.id);
            }}
          >
            {cart.product.name}
          </CartItemName>
          <CartItemControllerWrapper>
            <CartItemTrashImage
              src={trashIcon}
              onClick={() => removeCartItem(cart.id)}
            />
            <CartController product={cart.product}/>
          </CartItemControllerWrapper>
        </CartItemInfo>
        <CartItemPrice>{cart.product.price.toLocaleString()}원</CartItemPrice>
      </CartItemInfoWrapper>
    </CartItemLayout>
  );
}

export default CartItem;
