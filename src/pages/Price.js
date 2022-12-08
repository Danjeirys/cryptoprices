import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function Price (props) {
    // Our api key from coinapi.io
    const apiKey = '34159395-2FCD-4ADC-B328-458F5657508B'
    // Grabbing the Currency symbol from the URL Params
    const { symbol } = useParams()
    // Using the other two variables to create our URL
    const url = `http://rest-sandbox.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

    const [coin, setCoin] = useState(null)

    const getCoin = async () => {
        try{
            const response = await fetch(url)
            const data = await response.json()
            setCoin(data)
        } catch (e) {
            console.error(e)
        }
    }

    // useEffect to run getCoin when component mounts
    useEffect(() => {
        getCoin()
    }, []) // The square brackets act as limiters to avoid getting infinite req and breaking code

    // loaded function for when data is fetched
    const loaded = () => {
        return (
            <div>
                <h1>
                    {coin.asset_id_base}/{coin.asset_id_quote}
                </h1>
                <h2>{coin.rate}</h2>
            </div>
        )
    }

    // Function for when data doesn't exist
    const loading = () => {
        return <h1>Loading...</h1>
    }

    return coin && coin.rate ? loaded() : loading()
};