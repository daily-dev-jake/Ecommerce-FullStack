import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../theme";
import { decreaseCount, increaseCount } from "../state";
import { addToCart } from "../state";
const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();
  const { category, price, name, image } = item.attributes;
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;
  return (
    <Box width={width}>
      <Box
        position='relative'
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}>
        <img
          alt={item.name}
          width='300px'
          height='400px'
          src={`http://localhost:1337${url}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}
        />
        <Box
          display={isHovered ? "blocked" : "none"}
          position='absolute'
          bottom='10%'
          left='0'
          width='100%'
          padding='0 5%'>

          <Box display='flex' justifyContent='space-between'>
          
            {/* AMOUNT */}
            <Box
              display='flex'
              alignItems='center'
              backgroundColor={shades.neutral[100]}
              borderRadius='3px'>
              {/* setCount function is a short way to prevent count to go below 1 */}
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            {/* BUTTON */}
            <Button
              sx={{
                backgroundColor: shades.primary[300],
                color: "white",
              }}
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}>
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
      <Box mt='3px'>
        <Typography variant='subtitle2' color={neutral.dark}>
        {/* Replaces camelCase category names within backend to replacing and capitalizing first letter */}
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.UpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">{price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;
