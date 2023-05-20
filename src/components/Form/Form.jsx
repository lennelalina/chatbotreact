import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [name, setName] = useState('')
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');
    const [subject, setSubject] = useState('physical');
    const [pay, setPay] = useState('card');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject,
            name,
            pay
        }
        tg.sendData(JSON.stringify(data));
    }, [country, street, subject, name, pay])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!street || !country || !name) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street, name])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    const onChangePay = (e) => {
        setPay(e.target.value)
    }
    const onChangeName = (e) => {
        setName(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'ФИО'}
                value={name}
                onChange={onChangeName}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Страна'}
                value={country}
                onChange={onChangeCountry}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Улица'}
                value={street}
                onChange={onChangeStreet}
            />
            
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
            <select value={pay} onChange={onChangePay} className={'select'}>
                <option value={'card'}>VISA/Mastercard</option>
                <option value={'phonePay'}>ApplePay/SamsungPay</option>
                <option value={'oplati'}>Oplati</option>
            </select>
        </div>
    );
};

export default Form;