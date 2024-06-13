import React, { useState } from 'react';
import './Popup.css';


interface PropPopUps {
    title : string,
    text : string,
    onClose : () => void
}




export function Popup( {title  , text , onClose } : PropPopUps){

    return(
        <div className="popup" >  <p>  {text}  </p>
            <p> { title } </p>
            <button className='popup-button'  onClick={() => onClose()} > Cerrar </button>
        </div>

    );


}