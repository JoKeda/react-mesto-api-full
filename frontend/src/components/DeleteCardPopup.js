import React from 'react';
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({open,onClose,onSubmit}){
    return(
        <PopupWithForm onSubmit={onSubmit} onClose={onClose} isOpen={open} name='delete' title='Вы уверены?'/>
    )
}

export default DeleteCardPopup;