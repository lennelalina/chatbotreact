import React from "react";
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {


    return( 
   <div className={"form"}>
    <h3>ВВЕДИТН данные </h3>

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
   </div>
    );
}

export default Form;