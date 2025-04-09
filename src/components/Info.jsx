import React from "react";
import arrow from './../image/arrow.svg';

const Info = ({ setCartOpened, title, describtion, image }) => {
    return (
      <div className="cartEmpty d-flex align-center justify-center flex-column flex">
        {image && <img src={image} className="mb-20" width={120} alt="" />}
        <h2>{title}</h2>
        <p className="opacity-6">{describtion}</p>
        <button onClick={() => setCartOpened(false)} className="greenButton">
          <img src={arrow} className="back" alt="Back" /> Вернуться назад
        </button>
      </div>
    );
  };
  

export default Info;
