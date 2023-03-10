import './index.css'
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect, useContext } from 'react'
import { CartProducts } from '../../App'
import { HandleCart } from '../../js'
import { useForm } from 'react-hook-form'
function DetailProduct() {
    document.documentElement.scrollTop = 0
    const Navitage = useNavigate()
    const dataCarts = useContext(CartProducts)
    const [productDetail, setProductDetail] = useState([])
    const [img, setImg] = useState('')
    const [check, setCheck] = useState(false)
    const { id } = useParams()
    const getData = async () => {
        const res = await axios.get('../../../json/Products.json')
        const product = res.data.products.filter(product => Number(product.id) === Number(id))
        setProductDetail(product)
    }
    useEffect(() => {
        getData()
    }, [])
    const handleChange = () => {
        setCheck(!check)
    }

    const showModalForm = () => {
        document.querySelector('.login-form-detail').style.display = "flex"
    }
    useEffect(() => {
        const hideForm = (e) => {
            var element = document.querySelector('.login-form-detail')
            if (e.target == element) {
                element.style.display = "none"
            }
        }
        window.addEventListener('click', hideForm)
        return (() => {
            window.removeEventListener('click', hideForm)
        })
    }, [])
    return (
        <div style={{
            padding: "0 0 30px 0"
        }} className="bg-white">
            <div className="container pt-5 d-flex">
                <div className="col-5">
                    <div className="text-center">
                        {productDetail.map(product => (
                            <img style={{
                                maxHeight: "270px"
                            }} key={product.id} src={img || product.url_img} width="60%" alt="img product" />
                        ))}
                    </div>
                    <div className='slide-product-detail d-flex justify-content-center'>
                        {productDetail[0] && productDetail[0].img_detail && productDetail[0].img_detail.map((url, index) => (
                            <div className='img-slide-detail' key={index} >
                                <img onClick={() => setImg(url)} src={url} width="100%" />
                            </div>
                        ))}

                    </div>
                    <div className='text-center fs-14 my-3'>
                        <i>MacOne l?? ?????i l?? b??n l??? ???y quy???n c??c nh?? ph??n ph???i ch??nh h??ng Apple Vi???t Nam</i>
                        <p>S???n ph???m ch??nh h??ng Apple m???i 100% nguy??n seal. Ph??? ki???n ch??nh h??ng g???m:</p>
                        <p>h???p tr??ng imei, s???c, cable, s??ch h?????ng d???n</p>
                    </div>
                </div>
                <div className="col-7">
                    <div className="row">
                        <div className="col-7">
                            <div>
                                {productDetail.map(product => (
                                    <h5 key={product.id}>{product.product_name} {product.thongso}</h5>
                                ))}
                                <div className='row'>
                                    <div className="col-6">
                                        {productDetail.map(product => (
                                            <b key={product.id}>{check ? (product.price + 390000).toLocaleString() : product.price.toLocaleString()} ???</b>
                                        ))}
                                    </div>
                                    <div className="col-6">
                                        <p><img src="https://macone.vn/wp-content/themes/macone/images/mess-01.svg" width="30px" /> chat ????? ???????c t?? v???n</p>
                                    </div>
                                </div>

                                {productDetail[0] && <img src={productDetail[0].url_imgsale} width="100%" />}
                                <div className='text-baohanh p-2'>
                                    {productDetail[0] && productDetail[0].text_baohanh && productDetail[0].text_baohanh.map(text => (
                                        <p className='fs-13' key={text}><i className="fa color-green me-2 fa-check-circle"></i>{text}</p>
                                    ))}
                                </div>
                                <div className='row align-items-center'>
                                    <div className='col-1'>
                                        <input style={{
                                            width: "20px",
                                            height: "40px"
                                        }} checked={check} onChange={() => handleChange(productDetail[0] && productDetail[0].id)} type="checkbox" />
                                    </div>
                                    <div className='col-8 fs-13'>
                                        <b className='fs-14'>G??i b???o h??nh MacOne Care +390.000 ??? </b>
                                        <p>B???o h??nh 1 ?????i 1 nguy??n seal 30 ng??y</p>
                                    </div>
                                    <div className='col-3'>
                                        <img src='https://macone.vn/wp-content/themes/macone/images/bhv.png?v=1' width="100%" />
                                    </div>
                                </div>
                                <div className='thongso-tom-tat fs-13'>
                                    <h6>Th??ng s??? t??m t???t</h6>
                                    {productDetail[0] && productDetail[0].thongso_all && productDetail[0].thongso_all.map((ts, index) => (
                                        index < 5 ? <p key={ts.title}>-{ts.title}: {ts.content}</p> : ''
                                    ))}
                                </div>
                                <div className='text-center '>
                                    <div onClick={() => showModalForm()} className='btn-muangay text-center'>
                                        <h4>MUA NGAY</h4>
                                        <p>Giao h??ng t???n nh?? ho???c nh???n t???i c???a h??ng</p>
                                    </div>
                                    <div className='d-flex justify-content-between text-center m-0 mt-2'>
                                        <div onClick={() => HandleCart(productDetail[0], dataCarts, check, Navitage)} className="w-49 btn-muangay">
                                            <h6>TH??M V??O GI???</h6>
                                            <p>Ch???n th??m m??n ????? kh??c</p>
                                        </div>
                                        <div className="w-49 btn-muangay">
                                            <h6>MUA TR??? G??P</h6>
                                            <p>Th??? t???c ????n gi???n</p>
                                        </div>
                                    </div>
                                    <p className='my-2'>G???i ?????t mua: 0936.096.900</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="quatang">
                                <p>Mua m??y t??nh t???ng t??i ch???ng s???c, mi???n ph?? c??i ph???n m???m???</p>
                            </div>
                            <ChinhSach />
                            <div className=''>
                                <img src='../../../images/logoface.jpg' width="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='thongso-all'>
                    <h5>Th??ng s??? k??? thu???t</h5>
                    <table className='w-100 table-thongso'>
                        <tbody>
                            {productDetail[0] && productDetail[0].thongso_all && productDetail[0].thongso_all.map((ts, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{ts.title}</td>
                                        <td>{ts.content}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='login-form-detail '>
                <LoginFormDetail data={productDetail} check={check} />
            </div>
        </div>
    )
}
export default DetailProduct

function LoginFormDetail({ data, check }) {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (datas) => {
        const value = {
            cart: data,
            dataUser: datas,
            totalPrice: data.reduce((a, b) => a + (check ? b.price + Number(390000) : b.price), 0)
        }
    }
    return (
        <div className='content-form-detail p-2'>
            <div className='row -m-0'>
                <div className='col-3'>
                    {data.map(product => (
                        <img key={product.id} src={product.url_img} width="100%" alt='img detailproduct' />
                    ))}
                </div>
                <div className='col-9'>
                    {data.map(product => (
                        <div key={product.id}>
                            <p className='color-red fs-5'>{product.product_name} {product.thongso}</p>
                            <p className='color-red fs-4 f-b'>{check ? (product.price + Number(390000)).toLocaleString() : product.price.toLocaleString()}??</p>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row m-0'>
                    <div className="col-6">
                        <div className='position-relative'>
                            <input className='w-100 input-cart' type="text" placeholder="H??? v?? t??n"
                                {...register("fullName", {
                                    required: true,
                                    minLength: 9
                                })}
                            />
                            {errors.fullName?.type === "required" && (
                                <p className="text-message-form">Vui l??ng nh???p ?????y ????? h??? v?? t??n!</p>
                            )}
                            {errors.fullName?.type === "minLength" && (
                                <p className="text-message-form">Vui l??ng nh???p t???i thi???u 9 k?? t???!</p>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className='position-relative'>
                            <input className='w-100 input-cart' type="text" placeholder="S??? ??i???n tho???i"
                                {...register('phoneNumber', {
                                    required: true,
                                    minLength: 9
                                })}
                            />
                            {errors.phoneNumber?.type === "required" && (
                                <p className="text-message-form">Vui l??ng nh???p s??? ??i???n tho???i!</p>
                            )}
                            {errors.phoneNumber?.type === "minLength" && (
                                <p className="text-message-form">Vui l??ng nh???p ?????y ????? s??? ??i???n tho???i!</p>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className='position-relative'>
                            <input className='w-100 input-cart' type="text" placeholder="?????a ch??? email"
                                {...register('email', {
                                    required: true,
                                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                })} />
                            {errors.email?.type === "required" && (
                                <p className="text-message-form">Vui l??ng nh???p email c???a b???n!</p>
                            )}
                            {errors.email?.type === "pattern" && (
                                <p className="text-message-form">Vui l??ng nh???p ????ng email c???a b???n!</p>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <div className='position-relative'>
                            <input className='w-100 input-cart' type="text" placeholder="?????a ch???"
                                {...register('addres', {
                                    required: true,
                                    minLength: 12
                                })}
                            />
                            {errors.addres?.type === "required" && (
                                <p className="text-message-form">Vui l??ng nh???p ?????a ch??? c???a b???n!</p>
                            )}
                            {errors.addres?.type === "minLength" && (
                                <p className="text-message-form">Vui l??ng nh???p t???i thi???u 12 k?? t??!</p>
                            )}
                        </div>
                    </div>
                    <div className='col'>
                        <div className='position-relative'>
                            <textarea className='w-100 input-cart mb-5' type="text" placeholder="Ghi ch??"
                                {...register('note', {
                                    required: true,
                                    minLength: 12
                                })}
                            />
                            {errors.note?.type === "required" && (
                                <p className="text-message-form">Vui l??ng nh???p th??ng tin ?????a ch??? c??? th??? c???a b???n!</p>
                            )}
                            {errors.note?.type === "minLength" && (
                                <p className="text-message-form">Vui l??ng nh???p t???i thi???u 12 k?? t???!</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className='nav px-3 navbar'>
                    <div className=''>
                        <button className='btn-dat'>G???i ????n h??ng</button>
                    </div>
                    <div className=''>
                        <button type='button' onClick={() => document.querySelector('.login-form-detail').style.display = "none"} className='btn-delete-carts'>H???y</button>
                    </div>
                </div>
            </form>

        </div>
    )
}


function ChinhSach() {
    return (
        <div className='chinhsach'>
            <h6 >Ch??nh s??ch b??n h??ng</h6>
            <ul className='ul-detail'>
                <li><i className="fa fa-check-circle"></i>D??ng th??? 10 ng??y mi???n ph?? ?????i m??y. (Macbook like new)</li>
                <li><i className="fa fa-check-circle"></i> L???i 1 ?????i 1 trong 30 ng??y ?????u. (Macbook like new)</li>
                <li><i className="fa fa-check-circle"></i>Giao h??ng t???n nh?? to??n qu???c</li>
                <li><i className="fa fa-check-circle"></i>Thanh to??n khi nh???n h??ng (n???i th??nh)</li>
                <li><i className="fa fa-check-circle"></i> H??? tr??? ph???n m???m tr???n ?????i</li>
            </ul>
        </div>
    )
}