import React, {useContext,createRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({open, onClose, onSubmit}) {
    const urlRef = createRef();
    const handlePopupClose = () => {
        onClose();
    }

    return (
        <PopupWithForm isOpen={open} onSubmit={() => onSubmit(urlRef.current.value)} onClose={handlePopupClose}
                       name='avatar' title='Обновить аватар'>
            <input ref={urlRef} className="popup__input popup__input_element_img" type="url" name="avatar-img"
                   placeholder="Ссылка на картинку" required/>
            <span className="popup__error" id="error-img"/>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;