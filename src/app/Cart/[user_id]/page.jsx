'use client'
import React from 'react'
import axios from 'axios'
import { useState , useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'


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

  const minusQuantity =(elements) =>{

    console.log(elements);
    let now =  document.getElementById(elements).value
    if(parseInt(now) - 1 >0){
      document.getElementById(elements).value = parseInt(now) - 1
    }else{
      document.getElementById(elements).value = 1

    }

    
  }

  const plusQuantity =(elements) =>{
    console.log(elements);

    let now =  document.getElementById(elements).value
    document.getElementById(elements).value = parseInt(now) + 1
 }

  

  useEffect(()=>{
    getCarts(params.user_id)

  },[])

  return (
    <>
    <div className="flex w-full bg-base-100 flex-col lg:flex-row ">
      <div className="card  rounded-none grid flex-grow place-items-center w-full px-2">
              {/* <p className='font-semibold text-2xl subpixel-antialiased flex justify-start my-6 '>Shopping Carts</p> */}
                { dataCarts && dataCarts.length > 0 ? (
                      dataCarts.map((item,i)=>(
                        <div key={i} className=''>
                          {/* <p className='font-semibold text-md flex justify-end my-6'>{item.date}</p> */}
                          {item.products && item.products.length > 0 ? (
                            item.products.map((product,i)=>(
                              <div key={i} className="">
                                
                                  <div className="card card-side bg-base-100 shadow-xl  place-items-center m-4 px-2">

                                  <div className="">
                                      <input type="checkbox" className="checkbox" />
                                  </div>
                                    <figure>
                                    <Link href={`/ProductDetail/${product.productId}`}>
                                    <div className="avatar flex-none w-36 xl:w-32 ">
                                      <div className="rounded bg-base-200 p-2 m-2">
                                        <img src={relatedtoProduct(product.productId).image} className='w-1/2' />
                                      </div>
                                    </div>
                                    </Link>

                                    </figure>
                                    <div className="card-body">
                                      <h2 className="card-title line-clamp-1">{relatedtoProduct(product.productId).title}</h2>

                                      <span className="font-semibold ">
                                        <p className='font-semibold text-xs text-slate-400 line-clamp-2'>{relatedtoProduct(product.productId).description}</p>
                                      </span>
                                      <div className="card-actions">
                                        <div className='flex flex-col gap-2'>
                                          <p className='font-semibold text-sm text-orange-500 text-xl'><i className="fa-solid fa-money-bill"></i> ${relatedtoProduct(product.productId).price} </p>
                                          <p className='font-semibold text-sm text-slate-400 text-sm'><i className="fa-solid fa-truck-fast"></i> ${relatedtoProduct(product.productId).price} </p>

                                      

                                          <div className='flex gap-2 place-items-center'>
                                            <p className='hidden md:block font-semibold text-sm text-sm'> Quantity : </p>
                                            <button className='btn btn-neutral btn-xs' onClick={()=>minusQuantity(`quantity-${i}`)}><i className="fa-solid fa-minus"></i></button>
                                            <input type="text" id={`quantity-${i}`} defaultValue={product.quantity} placeholder="Type here" className="input text-sm text-center w-16 max-w-xs bg-transparent focus:border-none" />
                                            <button className='btn btn-neutral btn-xs' onClick={()=>plusQuantity(`quantity-${i}`)}><i className="fa-solid fa-plus"></i></button>
                                            <div className='flex-grow justify-end'>
                                              <button className='btn btn-error btn-xs text-base-100' onClick={()=>DeleteProductFromCart(product.productId)}><i className="fa-solid fa-trash-can"></i></button>
                                            </div>
                                          </div>
                                       

                          
                                        </div>
                                      </div>
                                    </div>
                                  </div>
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

              <div className='flex-col xl:flex xl:justify-between mt-2'>
                <div className='flex justify-center mb-2'>
                   <a href="/" className="btn btn-outline rounded-full mt-6 btn-wide font-semibold">Back To Shopping</a>
                </div>
                <div className='grid grid-cols-2 '>
                  <div>
                    <p className='flex font-semibold text-md me-6'>Quantity :</p>
                    <p className='flex font-semibold text-md me-6'>Subtotal :</p>
                    <p className='flex font-semibold text-md me-6 mb-6'>Shipping :</p>
                    <p className='flex font-semibold text-md me-6'>Total :</p>
                  </div>

                  <div>
                    <p className='flex justify-end font-semibold text-md'>{quatity ?? quantityitem}</p>
                    <p className='flex justify-end font-semibold text-md'>{subTotal}</p>
                    <p className='flex justify-end font-semibold text-md mb-6'>Shipping</p>
                    <p className='flex justify-end font-semibold text-md'>Total</p>
                  </div>

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

              <button className="btn btn-info rounded-full my-6 btn-wide">Checkout</button>
      
      </div>
    </div>




    </>

  )
}

export default Cartproduct