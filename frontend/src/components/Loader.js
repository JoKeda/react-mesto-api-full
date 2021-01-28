import React from "react";
import {ReactComponent as LoaderIcon} from '../images/loading.svg'


function Loader() {

    return(
        <div className="loader">
            <LoaderIcon/>
        </div>
    )
}

export default Loader;