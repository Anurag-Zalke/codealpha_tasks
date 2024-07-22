import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import { getGainersLosers } from "../../api";

function Cards() {
    const [data, setData] = useState(null);
    const [topPerformers, setTopPerformers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getGainersLosers();
                setData(response.data);
                setTopPerformers(response.data.top_gainers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    const handleClick = (event) => {
        const id = event.target.id;
        console.log(event);
        console.log(id);
        const underline = document.querySelector('.underline');
        if(id === "topgainers")
        {
            setTopPerformers(data.top_gainers);
        }
        else{
            setTopPerformers(data.top_losers);
        }
        const selectedButton = document.getElementById(id);
        console.log(selectedButton);
        underline.style.width = `${selectedButton.offsetWidth}px`;
        underline.style.transform = `translateX(${selectedButton.offsetLeft}px)`;
    }


    return (
        <div className="cards">
            <div className="buttoncontainer">
                <div>
                    <p className="cardbuttons" onClick={handleClick} id="topgainers">Top Gainers</p>
                </div>
                <div>
                <p className="cardbuttons" onClick={handleClick} id="toplosers">Top Losers</p>
                </div>
                <div className="underline">
                </div>
            </div>
            <div className="cardscontainer">
                {topPerformers && topPerformers.length > 0 ? (
                    topPerformers.map((gainer) => (
                        <Card
                            key={gainer.ticker}
                            ticker={gainer.ticker}
                            price={gainer.price}
                            chnge={gainer.change_percentage}
                        />
                    ))
                ) : (
                    <div className="loading-spinner"></div>
                )}
            </div>
        </div>
    );
}

export default Cards;
