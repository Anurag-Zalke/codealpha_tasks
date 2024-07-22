import React from "react";
import { useNavigate } from "react-router-dom";

export const Card = (props) => {
    
    const navigate = useNavigate();
    function handleClick() {
        navigate(`/card/${props.ticker}`);
    }
    
    return ( 
        <div className="card" onClick={handleClick}>
                <p className="ticker">{props.ticker}</p>
                <div>
                    <p className="price">${props.price}</p>
                    <p className="chnge" style={props.chnge[0]==='-'?{'color' : 'red'}: {'color':'green'}}>{props.chnge[0] ==='-'?props.chnge + '▼'  : '+' + props.chnge + '▲'} </p>
                </div>    
        </div>
    );
}

export default Card;