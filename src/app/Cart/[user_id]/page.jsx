'use client'
import React from 'react'
import axios from 'axios'
import { useState , useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CartItems from '@/app/components/cartItems'


async function DeleteProductFromCart(id){
  var option = {
    url : '/api/FakeStoreApi',
    method : 'DELETE',
    params : {
      func : 'DeleteProductFromCart',
      id : id
    }
  }

  axios.request(option).then((res)=>{
    console.log(res);

  }).catch((err)=>{
    console.log("connot delete now !");
  })
 }

const Cartproduct = ({params}) => {

  const [dataCarts , setdataCarts] = useState()
  const [dataProduct , setdataProduct] = useState()
  const [quatity , setQuantity] = useState()

  var subTotal = 0
  var quantityitem = 0
   function relatedtoProduct(ProductId){ // create relation 
    const result = dataProduct.find(product => product._id == ProductId)
    return result
  }

  async function getCarts(user_id){
    axios.get('/api/FakeStoreApi',{
      params : {
        user_id : user_id,
        func : 'getCartByUser'
      }
    }).then((res)=>{
      setdataCarts(res.data.responseCarts)
      setdataProduct(res.data.responseAll)

    }).catch((err)=>{

    })
  
  }



  

  useEffect(()=>{
    getCarts(params.user_id)

  },[])

  return (
    <>
    <div className="flex w-full bg-base-100 flex-col lg:flex-row ">
      <div className="card w-full">
              {/* <p className='font-semibold text-2xl subpixel-antialiased flex justify-start my-6 '>Shopping Carts</p> */}
                { dataCarts && dataCarts.length > 0 ? (
                      dataCarts.map((item,i)=>(
                        <div key={i} className=''>
                          {/* <p className='font-semibold text-md flex justify-end my-6'>{item.date}</p> */}
                          {item.products && item.products.length > 0 ? (
                            item.products.map((product,i)=>(
                              <div key={i}>
                                  {/* <div className="card p-2 bg-base-200 rounded-box m-2">
                                    <div className="flex w-full  lg:flex-row">
                                      <div className="w-32 md:w-40 lg:w-44 xl:w-48 bg-base-300 rounded-box grid flex-grow place-items-center p-1">
                                        <div className="avatar">
                                          <div className="p-1">
                                            <Link href={`/ProductDetail/${product.productId}`}>
                                                <img src={relatedtoProduct(product.productId).image} className='h-auto w-auto' />
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="rounded-none grid  flex-grow  w-full p-1 ps-2">
                                        <p className="text-sm font-semibold truncate line-clamp-1 w-100 mb-0">{relatedtoProduct(product.productId).title}</p>
                                        <p className='font-semibold text-md'> ${relatedtoProduct(product.productId).price} </p>

                                        <div className="flex place-items-center">
                                          <button className='btn btn-neutral btn-xs' onClick={()=>minusQuantity(`quantity-${i}`)}><i className="fa-solid fa-minus"></i></button>
                                          <input type="text" id={`quantity-${i}`} defaultValue={product.quantity} placeholder="Type here" className="input font-semibold text-xs text-center w-12 bg-transparent border-none focus:outline-none" />
                                          <button className='btn btn-neutral btn-xs' onClick={()=>plusQuantity(`quantity-${i}`)}><i className="fa-solid fa-plus"></i></button>
                                        </div>

                                      </div>
                                      <div className="rounded-none grid  flex-grow place-items-center w-max-px p-1">
                                          <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
                                      </div>

                                    </div>
                                  </div> */}
                                  <CartItems
                                  productId = {product.productId}
                                  image = {relatedtoProduct(product.productId).image}
                                  title = {relatedtoProduct(product.productId).title}
                                  price = {relatedtoProduct(product.productId).price}
                                  index={i}
                                  quatity = {product.quantity}
                                  />
                              </div>
                            ))
                          ) : (

                            <Image src="/Icon/empty-cart.png" width={200} height={200} alt=''></Image>
                          )}
                        </div>
                      ))
                ) : (
                  <div>
                            <p>Loading Product.....</p>
                  </div>

                )}

                <div className='flex justify-between mt-4'>
                  <p className='font-semibold text-md'>Items ({quatity ?? quantityitem}) :</p>
                  <p className='font-semibold text-md'>Total : {subTotal}</p>
                </div>
                  <div className="divider"></div>


              <div className='flex-col xl:flex xl:justify-between mt-2'>
                <div className='flex justify-center mb-2'>
                   <a href="/" className="btn btn-outline rounded-full  font-semibold">Back To Shopping</a>
                </div>
              </div>
      </div>
      <div className="w-full md:w-1/2 card bg-slate-800 rounded-none place-items-center h-100">
              <p className='font-semibold text-2xl subpixel-antialiased flex justify-start my-6 text-base-100'>Payment Info</p>

              <div className="flex gap-2 my-6">
                  <button className="btn btn-accent btn-outline rounded-full">Credit Card</button>
                  <button className="btn btn-accent btn-outline rounded-full">Paypal</button>
              </div>

              <label className="form-control w-full max-w-xs mt-6 mb-6 px-4">
                <div className="label">
                  <span className="label-text text-base-100 text-xs">What is your name</span>
                </div>
                <input type="text" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
              </label>

              <label className="form-control w-full max-w-xs mb-6 px-4">
                <div className="label">
                  <span className="label-text text-base-100 text-xs">Phone number</span>
                </div>
                <input type="text" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
              </label>

              <label className="form-control w-full max-w-xs mb-6 px-4">
                <div className="label">
                  <span className="label-text text-base-100 text-xs">Credit Card number</span>
                </div>
                <input type="text" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
              </label>

              <label className="form-control w-full max-w-xs mb-6 px-4">
                <div className="label">
                  <span className="label-text text-base-100 text-xs">Date Card</span>
                </div>
                <input type="text" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
              </label>

              <label className="form-control w-full max-w-xs mb-6 px-4">
                <div className="label">
                  <span className="label-text text-base-100 text-xs">Expired Date</span>
                </div>
                <input type="text" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
              </label>

              <label className="form-control w-full max-w-xs mb-6 px-4">
                <div className="label">
                  <span className="label-text text-base-100 text-xs">CVV</span>
                </div>
                <input type="text" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
              </label>

              {/* <div className="mb-6 px-6">
                <div className="flex gap-2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-base-100 text-xs">Expired Date</span>
                  </div>
                  <input type="date" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-base-100 text-xs"> .</span>
                  </div>
                  <input type="date" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-base-100 text-xs">CVV</span>
                  </div>
                  <input type="text" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
                </label>
                </div>
              </div> */}

              <button className="btn btn-info rounded-full my-6">Checkout</button>
      
      </div>
    </div>
    </>

  )
}

export default Cartproduct