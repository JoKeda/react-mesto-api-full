import React, {useEffect} from "react";


function PopupWithForm({name, title, children, onClose, isOpen, onSubmit}) {


    const closePopup = () => {
        onClose();
    }
    const submitHandler = (e) => {
        e.preventDefault();
        onSubmit();
    }
    useEffect(()=>{
        const close = (e) => {
            if (e.target.classList.contains('popup')) {
                closePopup()
            }
        }
        if(isOpen) {
            document.addEventListener('click', close)
        }
        return () => {
            document.removeEventListener('click',close)
        }
    },[isOpen])

    return (
        <div className={isOpen ? `popup popup__${name} popup_opened` : `popup popup__${name}`}>
            <form onSubmit={submitHandler} className="popup__form" name="popup__form">
                <h3 className="popup__title">{title}</h3>
                {children}
                <button className="popup__botton" type="submit">{name === 'delete' ? 'Да' : 'Сохранить'}</button>
                <button onClick={closePopup} className="popup__close" type="button"/>
            </form>
        </div>
    );
}

export default PopupWithForm;