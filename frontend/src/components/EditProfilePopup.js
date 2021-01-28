import React, {useState, useContext, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {UserContext} from "../contexts/CurrentUserContext";


function EditProfilePopup({open, onClose, onSubmit}) {
    const currentUser = useContext(UserContext);

    const [userInfo, setUserInfo] = useState({name: '', description: ''});

    const handleNameChange = (e) => {
        setUserInfo({...userInfo, name: e.target.value})
    }

    const handleDescriptionChange = (e) => {
        setUserInfo({...userInfo, description: e.target.value})
    }

    useEffect(() => {
        setUserInfo({name: currentUser.userName, description: currentUser.userDescription});
    }, [currentUser]);


    return (
        <PopupWithForm isOpen={open} onClose={onClose} onSubmit={() => onSubmit(userInfo)} name='profile'
                       title='Редактировать профиль'>
            <input className="popup__input popup__input_element_title" type="text" name="title"
                   placeholder="Имя"
                   minLength="2" maxLength="40" value={userInfo.name} onChange={handleNameChange} required/>
            <span className="popup__error" id="error-title"/>
            <input className="popup__input popup__input_element_description" type="text" name="description"
                   placeholder="О себе" minLength="2" maxLength="200" value={userInfo.description}
                   onChange={handleDescriptionChange} required/>
            <span className="popup__error" id="error-description"/>
        </PopupWithForm>
    )
}

export default EditProfilePopup;