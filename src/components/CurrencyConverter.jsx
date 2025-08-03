import React, { useEffect, useState } from "react";
import "./CurrencyConverter.css";
import CurrentDropDown from "./dropdown";
import { IoIosSwap } from "react-icons/io";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [favourites, setFavourites] = useState([]);

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("Error fetching", error);
    }
  };

  const handleFavourites = (currency) => {
    if (favourites.includes(currency)) {
      setFavourites(favourites.filter((fav) => fav !== currency));
    } else {
      setFavourites([...favourites, currency]);
    }
  };

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const currencyConvert = async () => {
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency]);
    } catch (error) {
      console.log("Conversion error", error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Currency Converter</h2>

      <div>
        <CurrentDropDown
          currencies={currencies}
          title="from:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          favourites={favourites}
          handleFavourites={handleFavourites}
        />
        <div>
          <button onClick={swap}>
            <IoIosSwap />
          </button>
        </div>
        <CurrentDropDown
          currencies={currencies}
          title="to:"
          currency={toCurrency}
          setCurrency={setToCurrency}
          favourites={favourites}
          handleFavourites={handleFavourites}
        />
      </div>

      <div>
        <label className="amt" htmlFor="amount">
          Amount
        </label>
        <input
          className="inp"
          value={amount}
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="conbtn">
        <button onClick={currencyConvert} className="subbtn">
          Convert
        </button>
      </div>

      <div className="new">
        Converted Amount:{" "}
        {convertedAmount ? `${convertedAmount} ${toCurrency}` : "--"}
      </div>
    </div>
  );
};

export default CurrencyConverter;

