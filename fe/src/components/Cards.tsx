import React, { useState } from 'react';
import { Card, Button, CardMedia, CardContent, CardActions } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct } from '../redux/actions';
import { IProduct } from '../utils/interfaces';

interface CardsProps {
    product: IProduct;
    isProductPage?: boolean;
}

function Cards({ product, isProductPage }: CardsProps) {
    const [inCart, setInCart] = useState<boolean>(!!product.quantity);
    const cartProducts = useSelector((state: IProduct[]) => state);
    const dispatch = useDispatch();

    const handleAddClick = () => {
        dispatch(addProduct(product));
        setInCart(true);
    }

    const handleRemoveClick = () => {
        dispatch(removeProduct(product.id));
        console.log(cartProducts, 'state');
        if (!product.quantity) {
            setInCart(false);
        }
    }

    return (
        <Card
            sx={{ width: 220, margin: '10px 0px 50px 0px' }}
        >
            <CardMedia component='img' alt="productImage" image={product.thumbnail} height={170} />
            <CardContent>
                <h3>{product.title}</h3>
                <h4>${product.price}</h4>
                <h6>{product.description}</h6>
            </CardContent>
            <CardActions>
                {inCart ? (
                    isProductPage ? <>Added</> :
                        <>
                            <Button className='btn' onClick={handleAddClick}>+</Button>
                            <span> {product.quantity || 1}</span>
                            <Button className='btn' onClick={handleRemoveClick}>-</Button>
                        </>
                ) : (
                    <Button className='btn' onClick={handleAddClick}>Add to Cart</Button>
                )}
            </CardActions>

        </Card>
    );
}

export default Cards;
