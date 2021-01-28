import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({open, onClose, onSubmit, onNameChange, onLinkChange}) {

    const [newPlaceInfo, setNewPlaceInfo] = useState({name: '', link: ''})

    const handleNameChange = (e) => {
        setNewPlaceInfo({...newPlaceInfo, name: e.target.value});
    }
    const handleLinkChange = (e) => {
        setNewPlaceInfo({...newPlaceInfo, link: e.target.value});
    }
    const addPlace = () => {
        onSubmit(newPlaceInfo).then(()=>{
            setNewPlaceInfo({name:'',link:''})
        })
    }
    return (
        <PopupWithForm isOpen={open} onClose={onClose} onSubmit={addPlace} name='element'
                       title='Новое место'>
            <span className="popup__error" id="global-add-error"/>
            <input className="popup__input popup__input_element_element-title" type="text"
                   name="element-title"
                   placeholder="Название" minLength="1" maxLength="30" value={newPlaceInfo.name} required
                   onChange={handleNameChange}/>
            <span className="popup__error" id="error-element-title"/>
            <input className="popup__input popup__input_element_img" type="url" name="element-img"
                   placeholder="Ссылка на картинку" value={newPlaceInfo.link} required onChange={handleLinkChange}/>
            <span className="popup__error" id="error-img"/>
        </PopupWithForm>
    )
}

export default AddPlacePopup;