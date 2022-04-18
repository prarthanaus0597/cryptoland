import React from 'react'
import '../css/CoinData.css'


const CoinData = (props) => {
    console.log(props)
let priceChange=(props.data!==undefined?props.data.price_change_percentage_24h:0);
    return (
        <div className='box'>
            {(props.data) !== undefined ?
                (<div className='information-box'>
                    <div className='information'>
                        <h5 className='h5'>
                            
<div className='group1'>

                          <div className='names'>Name : {props.data.name}</div> 
                          <div className='rank'>Market Cap Rank : {props.data.market_cap_rank}</div> 
                          <div className='logos'>Logo&nbsp;:&nbsp;<img className='images' src={props.data.image} alt='symbol' /></div>
</div>
<div className='group2'> 
                          <div className='price'>Current Price&nbsp;:&nbsp;{props.data.current_price.toLocaleString('en-IN')} &#8377;</div>
                          <div className='pricechange'>Price Change : {priceChange>0?<div className='up'><i className="fas fa-sort-up green"></i>{props.data.price_change_percentage_24h.toLocaleString('en-IN')}%</div>:<div className='down'><i className="fas fa-caret-down  red"></i>{props.data.price_change_percentage_24h.toLocaleString('en-IN')}%</div>}&nbsp;</div> 
                          <div className='mktcap'> Market Cap&nbsp;:&nbsp;{props.data.market_cap.toLocaleString('en-IN')}&#8377;</div>  
</div>
<div className='group3'>
                          <div className='volume'>Volume&nbsp;:&nbsp;{props.data.total_volume.toLocaleString('en-IN')}&#8377;</div>
                          <div className='supply'>Supply&nbsp;:&nbsp;{props.data.circulating_supply.toLocaleString('en-IN')}&#8377;</div>  
</div>
                        </h5>
                       
                    </div>
                </div>
                ) : (
                    <div>
                      <center> <h1>Preparing data....</h1></center> 
                    </div>)


            }

        </div>
    )


}

export default CoinData
