import React from 'react'
import '../css/HomeBody.css'

import image2 from '../images/hero/text-shape.svg'
import image3 from '../images/im1.svg'
import image8 from '../images/im2.svg'
import image4 from "../images/hero/h2-bit-l.png"
import image5 from "../images/hero/h2-bit-m.png"
import image6 from "../images/hero/h2-bit-s.png"
import { Link } from 'react-router-dom'
import image7 from '../images/intro.png'


const HomeBody = () => {
    return (
        <section className="hero-area">
            <div className="container1">
                <div className="row align-items-center">
                    <div className="col-lg-7 col-12 background">
                        <div className="hero-image">


                            <img className="h2-move-2" src={image6} alt="#" />
                            <img className="h2-move-3" src={image5} alt="#" />
                            <img className="h2-move-1" src={image4} alt="#" />
                            <img className="main-image" src={image7} alt="#" />

                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-12 contents">
                        <div className="hero-content">
                            <h4 className="wow fadeInUp" data-wow-delay=".2s">Track the price changes of Crypto Currencies</h4>
                            <h1 className="wow fadeInUp" data-wow-delay=".4s">Say goodbye
                                to <br />idle Money.
                                <span>
                                    <img className="text-shape" src={image2} alt="#" />

                                </span>
                            </h1>

                            <p className="wow fadeInUp" data-wow-delay=".6s">  CryptoLand with live visualization...
                                Make custom watchlist so that you can monitor changes of custom currencies in real time.
                            </p>
                            <center>
                                <div className="button-home" data-wow-delay=".8s">
                                    <figure>
                                        <img className='img1' src={image3} alt='' />
                                        <figcaption> <Link to="/viewall" className="btn btn-primary">

                                            Crypto Tracker</Link></figcaption>
                                    </figure>
                                    <figure>
                                        <img className='img2' src={image8} alt='' />
                                        <figcaption> <Link to="/watchlist" className="btn btn-success">
                                            Custom Watchlist</Link>
                                        </figcaption>
                                    </figure>
                                </div>
                            </center>
                        </div>
                        <br /> 
                    </div>

                    <br />
                </div>
            </div>
            {/* <img className="hero-shape" src={image1} alt="#"/>  */}

        </section>


    )
}

export default HomeBody
