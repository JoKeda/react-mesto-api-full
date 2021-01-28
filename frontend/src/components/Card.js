import React,{useContext} from "react";
import {UserContext} from "../contexts/CurrentUserContext";



function Card({cardInfo, onCardClick,onCardLike,onCardDeleteClick}) {
    const userInfo = useContext(UserContext);
    const handleClick = () => {
        onCardClick(cardInfo)
    }

    const isOwn = cardInfo.owner._id === userInfo._id;
    const isLiked = cardInfo.likes.some(i => i._id === userInfo._id);

    const cardDeleteButtonClassName = (
        `${isOwn ? 'element__delete' : 'element__delete_hidden'}`
    );
    const cardLikeButtonClassName = (
        `element__like ${isLiked?'element__like_active':''}`
    );

    return (
        <article className="element">
            <button className={cardDeleteButtonClassName} onClick={onCardDeleteClick} type="button"/>
            <img onClick={handleClick} src={cardInfo.link} className="element__image" alt={cardInfo.name}/>
            <div className="element__data">
                <h2 className="element__title">{cardInfo.name}</h2>
                <div className="element__like-info">
                    <button className={cardLikeButtonClassName} onClick={onCardLike} type="button"/>
                    <span className="element__like-score">{cardInfo.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;