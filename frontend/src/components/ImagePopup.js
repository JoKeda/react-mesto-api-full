import React,{useEffect} from 'react';

function ImagePopup({card, onClose,isOpen}) {
    const closePopup = () => {
        onClose();
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
        <div className={isOpen?"popup popup__image popup_opened":"popup popup__image"}>
            <article className="popup__image-container">
                <button onClick={closePopup} type="button" className="popup__close popup__close_image"></button>
                <img className="popup__image-item" src={card.link} alt={card.name}/>
                <p className="popup__image-description">{card.name}</p>
            </article>
        </div>
    )
}

export default ImagePopup;