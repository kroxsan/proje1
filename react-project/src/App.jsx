import { useState } from 'react'
import './App.css'
import PageContainer from './container/PageContainer';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';
import Loading from './components/Loading';
import Drawer from '@mui/material/Drawer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { calculateBasket, removeFromBasket, setDrawer } from './redux/slices/basketSlice';
import { useEffect } from 'react';

function App() {
  
  const {product, drawer, totalAmount} = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(calculateBasket());
}, [product]);

  return (
    <div>
      <PageContainer>
        
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer className='drawer' onClose={()=> dispatch(setDrawer())} anchor='right' open={drawer}>
          {
            product && product.map((product) =>{
              return (
                <div key={product.id} >
                <div className='flex-row' style={{padding: '20px'}}>
                  <img style={{marginRight:'5px'}} src={product.image} width={50} height={50} alt=""/>
                  <p style={{width:'320px', marginRight:'5px'}} >{product.title}({product.count})</p>
                  <p style={{fontWeight: 'bold', marginRight:'10px', width:'60px'}} >{product.price} USD</p>
                  <button onClick={() => dispatch(removeFromBasket(product.id))} style={{padding: '5px',borderRadius:'5px', backgroundColor:'red', border:'none', color:'#fff', width:'50px'}}> Sil </button>
                  
                </div>
                
                
                
                </div>

              
              )
            } 
          )

       }
        
      <div className='checkout-footer'>
      <p style={{ fontWeight: 'bold' }}>Toplam Tutar: {totalAmount.toFixed(2)} USD</p>
      <button className='checkout-button'>Siparişi Tamamla</button>
      </div>
     
      
          
      </Drawer>
      </PageContainer>
    </div>
  )
}

export default App
