import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useSelector } from 'react-redux';
import './cartStyles.css';
import Card from '../../components/Cards';
import { IProduct } from '../../utils/interfaces';


function Cart() {
    const [amount, setAmount] = useState<number>(0);
    const [items, setItems] = useState<number>(0);

    const cartItems: IProduct[] = useSelector((state: IProduct[]) => state);

    const calculateItems = () => {
        let res = 0;
        cartItems.forEach((item) => {
            res += item.quantity ? item.quantity : 1;
        });
        setItems(res);
    }

    const calculateAmount = () => {
        let res = 0;
        cartItems.forEach((item) => {
            res += item.quantity ? item.quantity * item.price : item.price;
        });
        setAmount(res);
    };

    useEffect(() => {
        calculateAmount();
        calculateItems();
    }, [cartItems])

    return (
        <div className='container'>
            <Navbar />
            <div className='cartBody'>
                <div className='productColumn'>
                    <h2>Product Items</h2>
                    <div className='products'>
                        {cartItems.map((product) => <Card key={product.id} product={product} />)}
                    </div>
                </div>
                <div className='billColumn'>
                    <h2>Bill</h2>
                    <div className='billBox'>
                        <div className='billItems'>
                            <h3>Total Items</h3>
                            <h3>{items}</h3>
                        </div>
                        <div className='billItems'>
                            <h3>Total Amount</h3>
                            <h3>${amount}</h3>
                        </div>
                        <div className='billItems'>
                            <h3>GST (28%)</h3>
                            <h3>${(amount * 0.28).toFixed(2)}</h3>
                        </div>
                        <div className='billItems'>
                            <h3>Delivery</h3>
                            <h3>$10</h3>
                        </div>
                        <div className='billItems'>
                            <h3>Grand Total</h3>
                            <h3>${(10 + amount + (amount * 0.28)).toFixed(2)}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Cart);
