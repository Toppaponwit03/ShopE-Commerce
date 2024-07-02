'use client'
import React from 'react'
import axios from 'axios'
import { useState , useEffect } from 'react'

function Cart({params}) {

  const [dataCarts , setdataCarts] = useState()
  const [dataProduct , setdataProduct] = useState()

   function relatedtoProduct(ProductId){ // create relation 
    const result = dataProduct.find(product => product.id === ProductId)
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

      // let t = res.data.responseAll.filter(e=>e.product.productId === res.data.responseCarts.id)

      // res.data.responseCarts.filter(e=>e.product.productId === res.data.responseAll.id)
      console.log(res);
    }).catch((err)=>{

    })
  
  }

  useEffect(()=>{
    getCarts(params.user_id)

    // console.log();
    
  },[])

  return (

      <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow card w-full place-items-stretch">
          <p className='font-semibold text-2xl subpixel-antialiased flex justify-start my-6'>Shopping Carts</p>
            { dataCarts && dataCarts.length > 0 ? (
                  dataCarts.map((item)=>(
                    <div key={item._id} className='divide-y divide-y-reverse'>
                      <p className='font-semibold text-md flex justify-end my-6'>{item.date}</p>
                      {item.products && item.products.length > 0 ? (
                        item.products.map((product)=>(
                          <div key={product._id} className="card bg-base-100 my-2 rounded-none hover:bg-base-200 active:bg-base-200 focus:outline-none focus:ring focus:ring-base-200">
                            <div className="card-body">
                              <div className='grid grid-cols-6 items-center'>
                                <div className='justify-start flex'>
                                  <div className="avatar">
                                    <div className="w-24 rounded">
                                      <img src={relatedtoProduct(parseInt(product.productId)).image} />
                                    </div>
                                  </div>
                                </div>
                                <div className='justify-center flex'>
                                  <p className='font-semibold text-sm'>
                                    {
                                      relatedtoProduct(parseInt(product.productId)).title
                                    }
                                  </p>
                                </div>
                                  <div className=''>
                                    <p className='font-semibold text-sm flex justify-end'>${relatedtoProduct(parseInt(product.productId)).price}</p>
                                  </div>
                                  <div className='flex justify-end'>
                                     <input  type="number" defaultValue={product.quantity} placeholder="Type here" className="input w-1/2 max-w-xs text-center" />
                                    {/* <p className='font-semibold text-sm flex justify-end'>{product.quantity}</p> */}
                                  </div>
                                  <div className=''>
                                    <p className='font-semibold text-sm flex justify-end'>${relatedtoProduct(parseInt(product.productId)).price * product.quantity}</p>
                                  </div>
                                  <div className='justify-end flex'>
                                      <button className='btn btn-error btn-xs'>delete</button>
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

          <div className='flex justify-end mt-2'>
            <div className='grid grid-cols-2 '>
              <div>
                <p className='flex justify-end font-semibold text-md me-6'>Subtotal :</p>
                <p className='flex justify-end font-semibold text-md me-6 mb-6'>Shipping :</p>
                <p className='flex justify-end font-semibold text-md me-6'>Total :</p>
              </div>

              <div>
                <p className='flex justify-start font-semibold text-md'>Subtotal</p>
                <p className='flex justify-start font-semibold text-md mb-6'>Shipping</p>
                <p className='flex justify-start font-semibold text-md'>Total</p>
              </div>

            </div>
          </div>

         </div> 
        <div className="divider lg:divider-horizontal"></div> 
        <div className="grid flex-grow card h-full bg-slate-500 w-1/3 rounded-box place-items-center">
          <p className='font-semibold text-2xl subpixel-antialiased flex justify-start my-6 text-base-100'>Payment Info</p>
        
        </div>
      </div>




  



  )
}

export default Cart