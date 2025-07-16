import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import Product from './Product'
function ProductList() {
    
    const dispatch = useDispatch();
    const { product } = useSelector((store) => store.product);
    
    useEffect(() => {
        dispatch(getAllProducts());
    }, []);
    
    
    return (
    <div className='flex-row' style={{flexWrap: 'wrap', marginTop: '25px'}}>
        {
            product && product.map((product) => (
                <Product key={product.id} product={product} />
            ))
        }
    
    </div>
    
  )
}

export default ProductList
