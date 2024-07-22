import React, { useEffect, useState } from "react";
import { getCardDetails, currentPrice } from "../../api";
import { useParams } from 'react-router-dom';
import Stock from "../Stock/Stock";

function CardDetails() {
    const [details, setDetails] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const { id } = useParams();
    const [symbol, setSymbol] = useState(null);

    useEffect(() => {
        async function getPrice(symbol) {
            const response = await currentPrice(symbol);
            setMetrics(response.data["Global Quote"]);
            console.log(response.data["Global Quote"]);
        }
        async function getDetails(id) {
            const response = await getCardDetails(id);
            setDetails(response.data);
            setSymbol(response.data.Symbol); // Set symbol state here
            console.log(response.data);
            getPrice(response.data.Symbol);
        }
        getDetails(id);
    }, [id]);

    return (
        <div className="details">
            {details ? (
                <div>
                    <div className="maindetails">
                        <div className="logoname">
                            <p className="comname">{details.Name}</p>
                            <p className="sym">{details.Symbol}, {details.AssetType}</p>
                            <p className="sym">{details.Exchange}</p>
                        </div>
                        <div className="pricechnge">
                            {metrics ? (
                                <div>
                                    <p>${metrics["05. price"]}</p>
                                    <p className="perchnge" style={metrics["10. change percent"] === '-' ? { 'color': 'red' } : { 'color': 'green' }}>{metrics["10. change percent"] === '-' ? metrics["10. change percent"] : '+' + metrics["10. change percent"]}</p>
                                </div>
                            ) :
                                <div className="loading-spinner"></div>}
                        </div>
                    </div>

                    <div className="about">
                        <p className="aboutheading">About {details.Name}</p>
                        <div className="line"></div>
                        <p className="aboutdesc">
                            {details.Description}
                        </p>
                    </div>
                    <div className="figurecontainer">
                        <Stock symbol={symbol} />
                    </div>
                </div>
            ) : <div className="loading-spinner"></div>}
        </div>
    );
}

export default CardDetails;
