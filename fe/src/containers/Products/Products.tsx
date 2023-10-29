import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import Navbar from '../../components/Navbar';
import { Select, Input, MenuItem, CircularProgress, Button, SelectChangeEvent } from '@mui/material';
import Cards from '../../components/Cards';
import './productStyles.css';
import { IProduct } from '../../utils/interfaces';


function Products() {
    const [searchValue, setSearchValue] = useState<string>('');
    const [category, setCategory] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(true);
    const [range, setRange] = useState<string>('all');
    const [limit, setLimit] = useState<number>(10);
    const [products, setProducts] = useState<IProduct[]>([]);

    const handleLoadMore = () => {
        if (limit < 100) {
            setLimit((prev) => prev + 10);
        }
    };



    const debounceSearch = debounce(async (val?: string) => {
        await fetch(`https://dummyjson.com/products/search?q=${val || ''}&limit=${limit}`)
            .then((res) => res.json())
            .then((res) => {
                if (range !== 'all') {
                    const isAsscending = range === 'lowToHigh';
                    res.products.sort((a: IProduct, b: IProduct) => isAsscending ? a.price - b.price : b.price - a.price);
                    return res;
                }
                return res;
            })
            .then((res) => {
                setLoading(false);
                setProducts(res.products);
            });
    }, 300);

    useEffect(() => {
        debounceSearch();
    }, [limit]);

    useEffect(() => {
        setLimit(10);
        debounceSearch();
    }, [range])

    const categorySearch = (value: string) => {
        fetch(`https://dummyjson.com/products/category/${value}`)
            .then((res) => res.json())
            .then((res) => {
                if (range !== 'all') {
                    const isAsscending = range === 'lowToHigh';
                    res.products.sort((a: IProduct, b: IProduct) => isAsscending ? a.price - b.price : b.price - a.price);
                    return res;
                }
                return res;
            })
            .then((res) => {
                setLoading(false);
                setProducts(res.products);
            });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setLoading(true);
        setSearchValue(value);
        debounceSearch(value);
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        if (event.target.value === 'all') {
            debounceSearch('');
        } else {
            categorySearch(event.target.value);
        }

        setCategory(event.target.value);
    };

    return (
        <div className='container'>
            <Navbar />
            <div className='bodyContainer'>
                <div className='sfcBox'>
                    <div>
                        <h5 className='box_title'>Search</h5>
                        <Input sx={{ color: 'wheat', paddingLeft: '10px', border: '1px solid white' }} value={searchValue} onChange={handleSearchChange} />
                    </div>
                    <div>
                        <h5 className='box_title'>Category</h5>
                        <Select
                            value={category}
                            sx={{ width: 120, color: "wheat", }}
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value="all"> all</MenuItem>
                            <MenuItem value="smartphones">smartphones</MenuItem>
                            <MenuItem value="skincare">skincare</MenuItem>
                            <MenuItem value="groceries">groceries</MenuItem>
                        </Select>
                    </div>
                    <div>
                        <h5 className='box_title'>Price Range</h5>
                        <Select
                            value={range}
                            sx={{ width: 200, color: 'wheat' }}
                            onChange={(e) => setRange(e.target.value)}
                        >
                            <MenuItem value="all"> all</MenuItem>
                            <MenuItem value="lowToHigh">Low to High</MenuItem>
                            <MenuItem value="highToLow">High to Low</MenuItem>
                        </Select>
                    </div>
                </div>
                <div className='cardContainer'>
                    {products && products.map((product) => <Cards key={product.id} product={product} isProductPage={true} />)}
                </div>
                <div style={{ textAlign: 'center', padding: '0 0 20px 0' }}>
                    {loading ? <CircularProgress /> : <Button onClick={handleLoadMore}>load more</Button>}
                </div>
            </div>
        </div>
    );
}

export default React.memo(Products);
