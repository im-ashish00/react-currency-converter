import React, { useState, useEffect } from 'react';
import CurrencyRow from './CurrencyRow';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  //Fetching everytime component loads
  var myHeaders = new Headers();
  myHeaders.append('apikey', 'rcJZxDfDZQocz8QwNxkzVgPK0hovHJ0Q');

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders,
  };
  useEffect(() => {
    fetch('https://api.apilayer.com/exchangerates_data/latest', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        let base = result.base;
        let otherCurrencies = Object.keys(result.rates);
        setCurrencyOptions([...new Set([base, ...otherCurrencies])]);
        setFromCurrency(base);
        setToCurrency(otherCurrencies[0]);
        setExchangeRate(result.rates[otherCurrencies[0]]);
      })
      .catch((error) => console.log('error', error));
  }, []);

  useEffect(() => {
    fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setExchangeRate(result.result)
      });
  }, [fromCurrency, toCurrency]);
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container d-flex justify-content-center text-light p-1 h3 ">
          Currency Converter
        </div>
      </nav>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '90vh', fontSize: '20px' }}
      >
        <CurrencyRow
          currencyOptions={currencyOptions}
          defaultCurrencyValue={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />

        <div style={{ fontSize: '25px', margin: '10px 0 20px' }}>=</div>

        <CurrencyRow
          currencyOptions={currencyOptions}
          defaultCurrencyValue={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
      </div>
    </div>
  );
}

export default App;
