import React, {useContext,useEffect} from "react";
import Card from "./Card";
import {UserContext} from "../contexts/CurrentUserContext";


function Main({onCardClick, onEditProfile, onEditAvatar, onAddPlace, onCardLike, onCardDeleteClick,onGetInfo}) {
    const userInfo = useContext(UserContext);
    useEffect(()=>{
        onGetInfo();
    },[])
    return (
        <>
            <section className="profile">
                <img onClick={onEditAvatar} src={userInfo.userAvatar} alt="Аватар"
                     className="profile__avatar"/>
                <span className="profile__avatar-edit"/>
                <div className="profile__data">
                    <div className="profile__data-item">
                        <h1 className="profile__title">{userInfo.userName}</h1>
                        <button className="profile__edit-button" onClick={onEditProfile}
                                type="button"/>
                    </div>
                    <p className="profile__description">{userInfo.userDescription}</p>
                </div>
                <button className="profile__add-button" onClick={onAddPlace} type="button"/>
            </section>
            <section className="elements">
                {userInfo?.cards?.map((card) => (
                    <Card onCardLike={() => onCardLike(card)} onCardDeleteClick={() => onCardDeleteClick(card)}
                          onCardClick={onCardClick} key={card._id} cardInfo={card}/>
                ))}
            </section>
        </>
    )
};

export default Main;