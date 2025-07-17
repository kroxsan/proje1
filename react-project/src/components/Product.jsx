import React from 'react'
import '../css/Product.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { CiShoppingBasket } from "react-icons/ci";
import { addToBasket } from '../redux/slices/basketSlice';
import { calculateBasket } from '../redux/slices/basketSlice';

function Product({product}) {
  const { id, price, image,title, description } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basket = useSelector((store) => store.basket.product);

  const handleAddToBasket = () => {
  const inBasket = basket.find(item => item.id === product.id);

  if (inBasket) {
    // Count'u mevcut sayıya +1 olarak güncelle
    dispatch(addToBasket(product));

  } else {
    // Ürün sepette yoksa, yeni ekle
    dispatch(addToBasket({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      count: 1
    }));
  }

  dispatch(calculateBasket());
};


    return (
    <div className='card'>
      <img className="image" src={image} alt=""></img>
      <div>
        <p style={{textAlign: 'center', height:'50px'}}> {title} </p>
        <h3 style={{textAlign: 'center'}}> {price}USD </h3>
        <button className="basket-icon-btn" onClick={handleAddToBasket}>
        <CiShoppingBasket className="icon" />
      </button>
      </div>

      <div className='flex-row'>
        <button onClick={()=> navigate("/product-details/" + id)} className='detail-button'>Detayına Git</button>
      </div>
    </div>
  )
}

export default Product
