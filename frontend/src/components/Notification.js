import React from "react";
import "../blocks/notification/notification.css"
import {ReactComponent as ErrorIcon} from "../images/error.svg";
import {ReactComponent as SuccessIcon} from "../images/success.svg";
import {ReactComponent as CloseIcon} from "../images/cancel.svg";


function Notification({info, onClose}) {

    const notificationClassname = info.open ? 'notification_box notification_visible' : 'notification_box notification_hidden';

    return (
        <div className='notification_container'>
            <div className={notificationClassname}>
                <div className='notification_icon_box'>
                    {info.type === "error" ? <ErrorIcon className='notification_icon'/> :
                        <SuccessIcon className='notification_icon'/>}
                </div>
                <div className='notification_text_box'>{info.text}</div>
                <div className='notification_close_button' onClick={onClose}>
                    <CloseIcon className='notification_icon'/>
                </div>
            </div>
        </div>
    )
}

export default Notification;