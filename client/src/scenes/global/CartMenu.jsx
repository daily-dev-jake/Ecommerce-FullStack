import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";

import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  });

  // first "div" acts like modal effect eg. huge component that darkens the main page
  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor='rgba(0,0,0,0.4)'
      position='fixed'
      zIndex={10}
      width='100%'
      height='100%'
      left='0'
      top='0'
      overflow='auto'>
      {/* MODAL */}
      <Box
        position='fixed'
        right='0'
        bottom='0'
        width='max(400px,30%)'
        height='100%'
        backgroundColor='white'>
            <Box padding="30px" overflow="auto" height="100%">
                {/* Header */}
                <FlexBox mb="15px">
                    <Typography variant="h3">Shopping Bag ({cart.length})</Typography>
                    <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                        <CloseIcon />
                    </IconButton>
                </FlexBox>

                {/* CART LIST */}
                <Box>
                    {cart.map((item) => (
                        <Box key={`${item.attributes.name}-${item.id}`}>
                            <FlexBox p="15px 0">
                                <Box flex="1 1 40%">
                                    <img alt={item?.name}
                                    width="123px"
                                    height="164px"
                                    src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`} />
                                </Box>
                            </FlexBox>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    </Box>
  );
};
