import axios from "axios";

const API = axios.create({baseURL : "https://www.alphavantage.co"});


export const getGainersLosers = async() => {
    const data = await API.get(`/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.API_K}`);
    return data;
}

export const searchKeyword = async (keyword) => {
    const data = await API.get(`/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${process.env.API_K}`);
    return data
}

export const getCardDetails = async (id) => {
    const data = await API.get(`/query?function=OVERVIEW&symbol=${id}&apikey=${process.env.API_K}`);
    console.log(data);
    return data;
}

export const currentPrice = async (symbol) => {
    const data = await API.get(`/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.API_K}`);
    console.log(data);
    return data;
}


