import React from 'react'
import AddItems from './addItems'
import Link from 'next/link'

function cartItems({productId,image,title,price,index,quatity}) {
  return (
    <div className="card p-2 bg-base-200 rounded-box m-2">
    <div className="flex w-full  lg:flex-row">
      <div className="w-32 md:w-40 lg:w-44 xl:w-48 bg-base-300 rounded-box grid flex-grow place-items-center p-1">
        <div className="avatar">
          <div className="p-1">
            <Link href={`/ProductDetail/${productId}`}>
                <img src={image} className='h-auto w-auto' />
            </Link>
          </div>
        </div>
      </div>
      <div className="rounded-none grid  flex-grow  w-full p-1 ps-2">
        <p className="text-sm font-semibold truncate line-clamp-1 w-100 mb-0">{title}</p>
        <p className='font-semibold text-md'> ${price} </p>

        <AddItems index = {index} quatity={quatity}/>

      </div>
      <div className="rounded-none grid  flex-grow place-items-center w-max-px p-1">
          <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
      </div>

    </div>
  </div>
  )
}

export default cartItems