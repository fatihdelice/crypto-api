import { useState, useEffect } from "react";
import axios from "axios";
import { useSearch } from '../context/SearchContext'

export default function Main() {
    const [crypto, setCrypto] = useState([]);
    const { searchValue } = useSearch();

    useEffect(() => {
        const getDataByFetch = async () => {
            axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&page=1&sparkline=false`)
                .then((getData) => {
                    setCrypto(getData.data);
                });
        };
        getDataByFetch();
    }, [crypto]);

    const filteredData = crypto.filter((val) => {
        return val.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    return (
        <section className="min-h-screen grid grid-cols-3 gap-5 mt-12 items-center">
            {filteredData.map((coin) => {
                return (
                    <div
                        key={coin.id}
                        className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 px-4 pt-4"
                    >
                        <div className="flex flex-col items-center pb-10">
                            <img
                                className="mb-3 w-24 h-24 rounded-full shadow-lg"
                                src={coin.image}
                                alt="BonnieImage"
                            />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                {coin.name}
                            </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {coin.current_price}
                            </span>
                            <div className="flex mt-4 space-x-3 md:mt-6">
                                <span
                                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 cursor-pointer"
                                >
                                    {coin.price_change_percentage_24h}%
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    )
}
