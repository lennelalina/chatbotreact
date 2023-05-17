import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

import umiv from "../../img/umiv2.jpg";
import shower from "../../img/shower.jpg";
import shower2 from "../../img/shower2.jpg";
import toalet from "../../img/toalet.jpg";
import toalet2 from "../../img/toalet2.jpg";
import wanna from "../../img/wanna1.jpg";
import wanna2 from "../../img/wanna2.jpg";
import wanna3 from "../../img/wanna3.jpg";

const products = [
    {id: '1', title: 'Умывальник керамический П45', price: 5000, Image: umiv, description: 'подвесной, 60см'},
    {id: '2', title: 'Душ мраморный shell', price: 12000,Image: shower,  description: 'Высота 2.05, пластик стенка'},
    {id: '3', title: 'Душ керамический 200S', price: 5000, Image: shower2, description: 'Встроеный, стекло стенка'},
    {id: '4', title: 'Унитаз керамический shell', price: 1220,Image: toalet, description: 'Подвесной, цвет молочный'},
    {id: '5', title: 'Унитаз мраморный', price: 5000,Image: toalet2, description: 'Встроенный, цвет белый'},
    {id: '6', title: 'Ванна мраморная shell', price: 6000,Image: wanna, description: 'Встроенная, с ножками 4 см'},
    {id: '7', title: 'Ванна чугунная А23', price: 5500, Image: wanna2,description: 'Чугун, цвет белый'},
    {id: '8', title: 'Ванна встроеная керамическая', price: 12000,Image: wanna3, description: '2,05 м, цвет молочный'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId, onClose} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])


    
    useEffect(() => {
        tg.onEvent('mainButtonClicked', onClose)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;