import React from "react";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";

const CurrentDropDown = ({
  currencies,
  currency,
  setCurrency,
  favourites,
  handleFavourites,
  title = "",
}) => {
  return (
    <div>
      <label className="labeldata" htmlFor={title}>
        {title}
      </label>
      <div className="change">
        <select
          className="frombar"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {/* Favourite currencies on top */}
          {favourites.length > 0 && (
            <>
              <optgroup label="Favourites">
                {favourites.map((fav) => (
                  <option key={fav} value={fav}>
                    {fav}
                  </option>
                ))}
              </optgroup>
            </>
          )}

          <optgroup label="All Currencies">
            {currencies.map((curr) => {
              return (
                <option value={curr} key={curr}>
                  {curr}
                </option>
              );
            })}
          </optgroup>
        </select>

        <button
          onClick={() => handleFavourites(currency)}
          className="favbtn"
          title="Add to Favourites"
        >
          <MdOutlineStarBorderPurple500 />
        </button>
      </div>
    </div>
  );
};

export default CurrentDropDown;

