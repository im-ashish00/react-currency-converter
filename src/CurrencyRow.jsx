import React from 'react';

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    defaultCurrencyValue,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;
  return (
    <div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          aria-label="Dollar amount (with dot and two decimal places)"
          value={amount}
          onChange={onChangeAmount}
        />
        <select
          className="form-select mx-4"
          value={defaultCurrencyValue}
          onChange={onChangeCurrency}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
