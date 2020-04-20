import React ,{useEffect,useState} from 'react';
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

var total = 0
var ship = 0
var montant = 0
 export default  function Cart(props){
    axios.post('http://localhost:3001/check_token',{token:localStorage.getItem('token')}).then((r)=>{
        if(r.data.data === -2)
            props.history.push("/login")
    })
    axios.post('http://localhost:3001/check_type',{type:localStorage.getItem('type')}).then((r)=>{
        if(r.data.data === 0)
            props.history.push("/")
    })
    const { t } = useTranslation();
    const [data, setData] = useState({ hits: [] });
    const fetchData = async () => {
        const result = await axios.post('http://localhost:3001/get_cart',{token:localStorage.getItem('token')});
        setData({hits:result.data});
      };
     useEffect(() => {
          fetchData();
      }, []);
      if(data && data.hits)
      {
          for(var i= 0 ;i< data.hits.length ;i++)
          {
              total += data.hits[i].prix * data.hits[i].quantity
          }
          if(total !== 0)
         { ship = 50
          montant = ship + total}
      }
    return(
            <section className="cart-area ptb-60">
            <ToastContainer transition={Slide} />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <form>
                                <div className="cart-table table-responsive">
                                <ToastContainer transition={Slide} />
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">{t('home.Product')}</th>
                                            <th scope="col">{t('home.PRIX')}</th>
                                            <th scope="col">{t('home.QUAN')}</th>
                                            <th scope="col">{t('home.Total')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                   {data && data.hits && data.hits.map((element,index)=>(
                                    <tr key={index}>
                                        <td  className="product-thumbnail">
                                                <a href="#">
                                                    <img src={`http://localhost:3001/images/${element.name_images}`} alt="item" />
                                                </a>
                                        </td>

                                        <td className="product-price">
                                            <span className="unit-amount">{element.prix} {t('home.PRICE')}</span>
                                        </td>

                                        <td className="product-quantity">
                                            <span className="unit-amount">{element.quantity} {t('home.KG')}</span>
                                            
                                        </td>

                                        <td className="product-subtotal">
                                            <span className="subtotal-amount">{element.prix * element.quantity} {t('home.PRICE')}</span>
                                        </td>
                                    </tr>))}
                                    </tbody>
                                </table>
                                </div>

                                <div className="cart-buttons">
                                    <div className="row align-items-center">
                                        <div className="col-lg-7 col-md-7">
                                            <div className="continue-shopping-box">
                                                    <a href="/" className="btn btn-light">{t('home.ContinueShopping')}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="cart-totals">
                                    <h3>{t('home.CartTotals')}</h3>

                                    <ul>
                                        <li>{t('home.subtotal')} <span>{total} {t('home.PRICE')}</span></li>
                                        <li>{t('home.Shipping')} <span>{ship} {t('home.PRICE')}</span></li>
                                        <li>{t('home.Total')} <span><b>{montant} {t('home.PRICE')}</b></span></li>
                                    </ul>
                                        <a href="/checkout" className="btn btn-light">{t('home.delivery')}</a>
                                        <a href="/checkout" className="btn btn-light ml-5">{t('home.credit')}</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    )
}