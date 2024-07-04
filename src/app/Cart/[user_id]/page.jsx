'use client'
import React from 'react'
import axios from 'axios'
import { useState , useEffect } from 'react'

const Cartproduct = ({params}) => {

  const [dataCarts , setdataCarts] = useState()
  const [dataProduct , setdataProduct] = useState()

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
    
    <div className="bg-base-100 p-10">
        <div className="">
          <div className="flex flex-col w-full lg:flex-row">
            <div className="grid flex-grow w-full place-items-stretch px-4">
              <p className='font-semibold text-2xl subpixel-antialiased flex justify-start my-6'>Shopping Carts</p>
                { dataCarts && dataCarts.length > 0 ? (
                      dataCarts.map((item,i)=>(
                        <div key={i} className='divide-y divide-y-reverse'>
                          {/* <p className='font-semibold text-md flex justify-end my-6'>{item.date}</p> */}
                          {item.products && item.products.length > 0 ? (
                            item.products.map((product,i)=>(
                              <div key={i} className="card my-2 rounded-lg w-100">
                                <div className="">
                                  <div className='flex place-items-center gap-2'>
                                    <div className='flex-none'>
                                      <input type="checkbox" className="checkbox" />
                                    </div>

                                    <div className="avatar flex-none w-24 xl:w-32">
                                      <div className="rounded bg-base-200 p-2 m-2">
                                        <img src={relatedtoProduct(product.productId).image} className='' />
                                      </div>
                                    </div>


                                    <div className='flex-1 w-40 '>
                                        <span className='hidden'>
                                          {subTotal += parseFloat(relatedtoProduct(product.productId).price)}
                                          {quantityitem += parseInt(product.quantity)}

                                        </span>
                                      <p className='font-semibold text-sm text-nowrap truncate mb-4'>
                                        {
                                          relatedtoProduct(product.productId).title
                                        }
                                      </p>
                                      <div className='flex place-items-center justify-between'>
                                        <p className='font-semibold text-sm'>${relatedtoProduct(product.productId).price}</p>
                                        <input type="number" defaultValue={product.quantity} placeholder="Type here" className="input w-1/2 max-w-xs" />
                                        <button className='btn btn-error btn-xs'>delete</button>

                                      </div>


                                    </div>


                                

                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>Loading Product.....</p>
                          )}
                        </div>
                      ))
                ) : (
                  <div>
                    <p>Loding Carts...</p>
                  </div>

                )}

              <div className='flex-col xl:flex xl:justify-between mt-2'>
                <div className='flex justify-center mb-2'>
                   <a href="/" class="btn btn-outline rounded-full mt-6 btn-wide font-semibold">Back To Shopping</a>
                </div>
                <div className='grid grid-cols-2 '>
                  <div>
                    <p className='flex font-semibold text-md me-6'>Quantity :</p>
                    <p className='flex font-semibold text-md me-6'>Subtotal :</p>
                    <p className='flex font-semibold text-md me-6 mb-6'>Shipping :</p>
                    <p className='flex font-semibold text-md me-6'>Total :</p>
                  </div>

                  <div>
                  <p className='flex justify-end font-semibold text-md'>{quantityitem}</p>
                    <p className='flex justify-end font-semibold text-md'>{subTotal}</p>
                    <p className='flex justify-end font-semibold text-md mb-6'>Shipping</p>
                    <p className='flex justify-end font-semibold text-md'>Total</p>
                  </div>

                </div>
              </div>

            </div> 
            <div className="w-full mt-6 md:w-full lg:w-1/3 xl:w-1/3 grid flex-grow bg-slate-800 place-items-center">
              <p className='font-semibold text-2xl subpixel-antialiased flex justify-start my-6 text-base-100'>Payment Info</p>

              <div className="flex gap-2">
                  <button class="btn btn-accent btn-outline rounded-full">Credit Card</button>
                  <button class="btn btn-accent btn-outline rounded-full">Paypal</button>
              </div>

              <label className="form-control w-full max-w-xs mt-6 mb-6 px-4">
                <div className="label">
                  <span className="label-text text-base-100 text-xs">What is your name?</span>
                </div>
                <input type="text" placeholder="Type here" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
              </label>

              <label className="form-control w-full max-w-xs mb-6 px-4">
                <div className="label">
                  <span className="label-text text-base-100 text-xs">What is your name?</span>
                </div>
                <input type="text" placeholder="Type here" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
              </label>

              <label className="form-control w-full max-w-xs mb-6 px-4">
                <div className="label">
                  <span className="label-text text-base-100 text-xs">What is your name?</span>
                </div>
                <input type="text" placeholder="Type here" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
              </label>

              <div className="mb-6 px-4">
                <div className="flex gap-2">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-base-100 text-xs">Expired Date</span>
                  </div>
                  <input type="text" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-base-100 text-xs"> .</span>
                  </div>
                  <input type="text" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-base-100 text-xs">CVV</span>
                  </div>
                  <input type="text" placeholder="" className="text-end text-sm text-base-100 w-full max-w-xs bg-transparent border-b border-slate-500 focus:outline-none focus:border-gray-100" />
                </label>
                </div>
              </div>

              <button class="btn btn-info rounded-full mt-6 btn-wide">Checkout</button>

            </div>
          </div>
        </div>
    </div>





  



  )
}

export default Cartproduct