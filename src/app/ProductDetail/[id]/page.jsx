'use client'
import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import CARDPRODUCT from '../../components/cardProduct'
function Product({params}) {

  const [Product , setProduct] = useState()
  const [Review , setReview] = useState()
  const [topFour , settopFour] = useState()



  async function getProduct(id){ // ดึงข้อมูลสินค้า
    await axios.get('/api/FakeStoreApi',{
      params:{
        id : id,
        func : 'firstProduct'
      }
    }).then((res)=>{
      setProduct(res.data[0]);
    }).catch((err)=>{
  
    })
  }

  async function getReviews(id){ // ดึงข้อมูลการรีวิว
    await axios.get('/api/FakeStoreApi',{
      params:{
        id : id,
        func : 'getReview'
      }
    }).then( (res)=>{
      setReview(res.data.reviews);
    }).catch((err)=>{
  
    })
  }

  async function getTopFour(){ // 
    await axios.get('/api/FakeStoreApi',{
      params:{
        func : 'topFive'
      }
    }).then( (res)=>{
      settopFour(res.data);
    }).catch((err)=>{
  
    })
  }

  useEffect(()=>{

    getProduct(params.id)
    getReviews(params.id)
    getTopFour()

  },[])
  return (
    <div>
        {Product ? (
        <div>
            <div className="card bg-base-100 shadow-xl m-4">
              <div className="card-body">
                  <p className='font-bold text-2xl mb-6'>Details</p>

                  <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                    <div className=" card rounded-box place-items-center">
                    <div className="carousel">
                      <div id="item1" className="carousel-item w-full flex justify-center">
                        <Image
                        className='p-4'
                        src={Product.image} 
                        width={300} 
                        height={100} 
                        alt={Product.title}
                        />
                      </div> 
                      <div id="item2" className="carousel-item w-full flex justify-center">
                      <Image
                        className='p-4'
                        src={Product.image} 
                        width={300} 
                        height={100}
                        alt={Product.title}

                        />
                      </div> 
                      <div id="item3" className="carousel-item w-full flex justify-center">
                      <Image
                        className='p-4'
                        src={Product.image} 
                        width={300} // Set width (optional, specify as per your design)
                        height={100} 
                        alt={Product.title}

                        />
                      </div> 
                      <div id="item4" className="carousel-item w-full flex justify-center">
                      <Image
                        className='p-4'
                        src={Product.image} 
                        width={300} // Set width (optional, specify as per your design)
                        height={100} 
                        alt={Product.title}

                        />
                      </div>
                    </div> 
                      <div className="flex justify-center w-full py-2 gap-2">
                        <a href="#item1" className="btn btn-xs">1</a> 
                        <a href="#item2" className="btn btn-xs">2</a> 
                        <a href="#item3" className="btn btn-xs">3</a> 
                        <a href="#item4" className="btn btn-xs">4</a>
                      </div>

                    </div>
                    {/* <div className="divider divider-horizontal"></div> */}
                    <div className="card rounded-box">

                        <p className="font-semibold text-md mb-0">{Product.category}</p>
                        <p className="font-semibold text-xl mb-6">{Product.title}</p>


                        <div className="flex gap-4 mb-6">
                            {Product.rating ? (
                              <div>
                                <div className="rating">
                                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked={Product.rating.rate >= 1 ? true : false} />
                                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked={Product.rating.rate >= 2 ? true : false}  />
                                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked={Product.rating.rate >= 3 ? true : false}  />
                                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked={Product.rating.rate >= 4 ? true : false} />
                                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked={Product.rating.rate >= 5 ? true : false} />
                                </div>
                                <label className="text-sm font-semibold">( {Product.rating.rate} )</label>
                              </div>
                            ) : (
                              <div>
                              <div className="rating">
                                <input hidden type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked/>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"/>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"/>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"/>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"/>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"/>
                              </div>
                              <label className="text-sm font-semibold">( Not have Review )</label>
                            </div>
                            )}
                        </div>

                        <p className="font-semibold text-md text-success">{ ((((Product.price + 20) -  Product.price)/(Product.price + 20))*100).toFixed(2) } %</p>
                        <p className="text-md">Price : <span className="line-through">${Product.price + 20}</span>   <span className="font-bold">${Product.price}</span> </p>

                        <div className="mt-4">
                              <p className="text-sm ">
                                  {Product.description}
                              </p>

                        </div>

                        <div className="flex my-2 gap-1">
                          {/* <p className='font-semibold text-sm'>color :</p> */}

                            <div className="badge badge-primary"></div>
                            <div className="badge badge-primary"></div>
                            <div className="badge badge-primary"></div>
                        </div>


                        <input type="number" placeholder="Type here" className="input input-bordered mb-2" />
                        <div className="flex gap-2">
                          <button className="btn btn-primary btn-sm">Add to cart</button>
                          <button className="btn btn-success btn-sm">Buy now</button>
                        </div>

                    </div>
                  </div>


                  {/* content review */}
                  <div className='mt-10'>
                    <p className='font-bold text-2xl mb-6'>Reviews</p>
                    { Review && Review.length > 0 ? (
                      <div>
                        {Review.map((item,index) => (

                          <div key={index} className="chat chat-start">
                              <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                  <Image width={50} height={50}  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                              </div>
                              <div className="chat-bubble bg-base-100 shadow-md min-w-full">
                                <p className='font-semibold text-sm'>{item.reviewerName}</p>
                                <div className="flex gap-4 mb-2">
                                  <div className="rating">
                                    <input type="radio" name={item.id} className="mask mask-star-2 bg-orange-400" defaultChecked={item.rating >= 1 ? true : false}  />
                                    <input type="radio" name={item.id} className="mask mask-star-2 bg-orange-400" defaultChecked={item.rating >= 2 ? true : false}   />
                                    <input type="radio" name={item.id} className="mask mask-star-2 bg-orange-400" defaultChecked={item.rating >= 3 ? true : false}   />
                                    <input type="radio" name={item.id} className="mask mask-star-2 bg-orange-400" defaultChecked={item.rating >= 4 ? true : false}  />
                                    <input type="radio" name={item.id} className="mask mask-star-2 bg-orange-400" defaultChecked={item.rating >= 5 ? true : false}  />
                                  </div>
                                  <label className="text-sm font-semibold">( {item.rating} )</label>
                                </div>
                                  {item.comment }
                                    <div className="flex gap-1 mt-2 justify-end">
                                      <div className="badge badge-lg"></div>
                                      <div className="badge badge-lg"></div>
                                      <div className="badge badge-lg"></div>
                                    </div>
                              </div>
                          </div>
                        
                        ))}
                        <div className='flex justify-center mt-4'>
                          <button className="btn btn-sm">View more</button>
                        </div>

                      </div>
                    ) : 
                    (
                      <p> LoadingModuleData..... </p>

                    )}
                  </div>

              </div>
            </div>
        </div>
          
        ) : (

        <p> loading product.... </p>
        )}


              {/* Top 4 Product Hight sale */}
        <div className="card bg-base-100 shadow-xl m-4">
          <div className="card-body">
              <div>
                  <p className='font-bold text-2xl mb-6'>Product </p>
                      <div className='flex justify-end mt-4'>
                      <button className="btn btn-sm my-2 me-2">View more</button>
                    </div>
                    {topFour && topFour.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                          {topFour.map((product,index) => (
                              <CARDPRODUCT 
                                key={index}
                                img={product.image}
                                title={product.title} 
                                subtitle = {product.price}
                                description={product.description} 
                                rating={product.rating.rate}
                                count={product.rating.count}
                                action="Buy now"
                                link = {`/ProductDetail/${product.id}`}
                                 
                              />

                          ))}
                      </div>
                ) : (
                  <p>Loading Top four...</p>
                )}
              </div>
          </div>
        </div>

    </div>


    
  )
}

export default Product