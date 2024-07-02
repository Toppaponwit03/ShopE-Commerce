import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function cardProduct( {id,link,img ,title ,subtitle , description , action , rating , count ,tag} ) {
  return (
    <div>
        <div className="card h-full bg-base-100 p-2 border-solid border-2 border-base-200 rounded-none">
         <Link href={link}>
              <figure className='min-h-52 max-h-52 '>
                {tag ? (
                  <span className="ribbon">{tag}</span>
                ) : (<></>)}
                <Image src={img}  
                    width={800}
                    height={800} 
                    alt={title}
                    priority
                />
                </figure>
              <div className="card-body min-h-36 max-h-52 ">
                <h6 className="card-title text-sm truncate">{title} </h6>
                <div className='flex gap-1'>
                <p className="text-sm font-semibold text-error">${subtitle}</p>
                <p className="text-sm font-semibold text-neutral-400 line-through">${subtitle *2}</p>
                </div>

                

                {/* <p className="text-xs antialiased">{description}</p> */}
                <div className="">
                  <div className="rating rating-xs">
                    <input type="radio" name={id} className="mask mask-star-2 bg-orange-400" defaultChecked={rating >= 1 ? true : false} />
                    <input type="radio" name={id} className="mask mask-star-2 bg-orange-400" defaultChecked={rating >= 2 ? true : false}  />
                    <input type="radio" name={id} className="mask mask-star-2 bg-orange-400" defaultChecked={rating >= 3 ? true : false}  />
                    <input type="radio" name={id} className="mask mask-star-2 bg-orange-400" defaultChecked={rating >= 4 ? true : false} />
                    <input type="radio" name={id} className="mask mask-star-2 bg-orange-400" defaultChecked={rating >= 5 ? true : false} />
                  </div>
                    <div className="badge badge-primary ms-1">{rating}</div>
                    {/* <p className="text-sm font-semibold text-neutral-400">{id}</p> */}
                    {/* <Link href={link} className="btn btn-sm">{action}</Link> */}
                </div>
              </div>
          </Link>
            <div className="card-fotter bg-base-200 flex justify-center gap-1">
                <button className="btn btn-xs btn-warning">Edit</button>
                <button className="btn btn-xs btn-error">delete</button>

            </div>
        </div>
    </div>
  )
}

export default cardProduct