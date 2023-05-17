import React from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

const ProductItem = ({product, className, onAdd}) => {
const {title, Image, description,price} = product;
    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <div className={'Image'}>  <img src={Image} width={'100%'}/> </div>
            <div className={'title'}>{title}</div>
            <div className={'description'}>{description}</div>
            <div className={'price'}>
                <span>Стоимость: <b>{price}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default ProductItem;