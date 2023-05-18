import titleLogo from '../../assets/title_logo.png';
import { useNavigate } from 'react-router-dom';
import { Container } from '../../style/style';
import {
  CartCount, CartCountWrapper, CartTitle, CartWrapper, HeaderWrapper, LogoImage, LogoWrapper, Navbar
} from './Header.style';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartCountSelector, cartState } from '../../recoil/cartAtoms';
import { useEffect } from 'react';

function Header() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);
  const setCartList = useSetRecoilState(cartState);

  const loadCartList = async () => {
    try {
      const response = await fetch('/cart-items');
      const data = await response.json();
      setCartList(data);
    } catch (error) {
      console.error(error);
      throw new Error();
    }
  }

  useEffect(() => {
    loadCartList();
  }, []);

  return (
    <Navbar>
      <Container>
        <HeaderWrapper>
          <LogoWrapper onClick={() => navigate('/')}>
            <LogoImage src={titleLogo} />
          </LogoWrapper>
          <CartWrapper onClick={() => navigate('/cart')}>
            <CartTitle>장바구니</CartTitle>
            <CartCountWrapper>
              <CartCount>{cartCount}</CartCount>
            </CartCountWrapper>
          </CartWrapper>
        </HeaderWrapper>
      </Container>
    </Navbar>
  );
}

export default Header;
