



import axios from "axios"
import { useState, useEffect, useRef } from 'react'
import './ItemProduct.css'
import FilterMenu from "./FilterMenu"
import Product from "../../Components/Products/Product"
import { SlideItemProduct } from "../../js"
import { ButtonOptions, changePrice, changeNew, handlePrice } from "../../js"
import SlideTop from "../../Components/CommonComponent"
export default function PageChildren2({ id_children1, id_children2, category_id }) {
    const [styBtn, setStyleBtn] = useState('')
    const [datas, setDatas] = useState([])
    const [listProductac, setListProductac] = useState([])
    const [listProduct, setListProduct] = useState([])
    const [dataItem, setDataItem] = useState([])
    const getData = async () => {
        const res = await axios.get('../../../json/Products.json')
        const datas = res.data.category.filter(item => item.category_id === category_id)//1
        const dataHeading = datas[0].subList.filter(item => item.id_children1 === id_children1)
        const dataItems = dataHeading[0].subList.filter(item => item.id_children2 === id_children2)
        const products = res.data.products.filter(product => product.category_id === category_id).filter(item => item.id_children1 === id_children1).filter(item => item.id_children2 === id_children2)
    
        setDataItem(dataItems)
        setListProductac(products)
        setDatas(dataHeading)
        setListProduct(products)
    }
    useEffect(() => {
        getData()
    }, [])


   
    return (
        <div>
            <div className="bg-white">
                <div className="container">
                    <div className="row m-0">
                        <div className="col-2 d-flex justify-content-center align-items-center p-0">
                            <div ><h5>{dataItem[0] && dataItem[0].product_children_name}</h5></div>
                        </div>
                        <div className="col-8 p-0">
                            <div className='container abc position-relative'>
                                <div className='row row-slide'>
                                    {datas[0] && datas[0].subList.map((item, index) => {
                                        return (
                                            <SlideTop key={index} item={item} />
                                        )
                                    })}
                                </div>
                                <i onClick={() => SlideItemProduct(1)} className="fa click-right-product fa-chevron-right"></i>
                                <i onClick={() => SlideItemProduct(2)} className="fa click-left-product fa-chevron-left"></i>
                            </div>
                        </div>
                        <div className="col-2 d-flex justify-content-center align-items-center p-0">
                            <div>
                                <h5>so sanh</h5>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="nav navbar">
                        <div className="nav">
                            {ButtonOptions.map(item => (
                                <button onClick={() => handlePrice(item.value, setListProduct, listProductac, setStyleBtn)} className={`btn-option ${styBtn == item.value && ' bg-info'}`} key={item.value}>{item.name}</button>
                            ))}
                        </div>
                        <div>
                            <div className="nav">
                                <button className="btn-delete-option">Bỏ tất cả bộ lọc</button>
                                <select onChange={(e) => changeNew(e.target.value, setListProduct, listProductac, setStyleBtn)} className="btn-option">
                                    <option value={0}>Tình trạng</option>
                                    <option value={1}>New</option>
                                    <option value={2}>Like New</option>
                                </select>
                                <select onChange={(e) => changePrice(e.target.value, setListProduct, listProductac, setStyleBtn)} className="btn-sapxep">
                                    <option value={0}>Sắp xếp theo</option>
                                    <option value={1}>Giá thấp đến cao</option>
                                    <option value={2}>Giá cao đến thấp</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="container">
                    <div className="row m-0">
                        <div className="col-2 bg-white">
                            <FilterMenu datas={datas} />
                        </div>
                        <div className="col-10">
                            <h5 className="m-3">Danh Mục {dataItem[0] && dataItem[0].product_children_name}</h5>
                            {listProduct.length > 0 ? (<div className="row m-0">
                                {listProduct.map((product) => {
                                    return (
                                        <Product key={product.id} product={product} />
                                    )
                                }

                                )}
                            </div>) : <h6 className="m-5">không tìm thấy sản phẩm phù hợp nào </h6>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}