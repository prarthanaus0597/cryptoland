import React from 'react';
import '../css/Coins.css';
import {Link} from 'react-router-dom'

const Coins = ({ id = 0,coin_id, name, image, symbol, price, volume, priceChange = 0, market_cap }) => {
   let priceChanges;
   if (priceChange) {
      priceChanges = priceChange;
   }
   else {
      priceChanges = 0;
   }




   

   return (
      <>

         <tr>
            <td>{id + 1}</td>
            <td className='image'><img src={image} alt='crypto' /></td>
            <td className='name'>{name}</td>
            <td className='symbol'>{symbol}</td>
            <td>{price.toLocaleString('en-IN')}</td>
            {priceChanges < 0 ?
             (<td className='red'><i className="fas fa-caret-down  red"></i>
             {priceChanges.toFixed(2)}% </td>) : 
             (<td className='green'><i className="fas fa-sort-up green"></i>
             {priceChanges.toFixed(2)}% </td>)}
            <td>{volume.toLocaleString('en-IN')}</td>
            <td>{market_cap.toLocaleString('en-IN')}</td>
            <td><Link to={`/watchlist/tracker/${coin_id}`}><i className="fas fa-chart-bar"></i></Link></td>
         </tr>

      </>
   )
}

export default Coins
