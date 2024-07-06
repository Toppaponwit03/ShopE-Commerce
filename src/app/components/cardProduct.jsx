import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import FormProduct from './formProduct'



// const showModalContent = (params) =>{
//   const modal = document.getElementById('my_modal_4');
//   modal.showModal();
//   console.log("params" , params);
  
// }

async function DeleteProduct(id){
  var option = {
    url : '/api/FakeStoreApi',
    method : 'DELETE',
    params : {
      func : 'DeleteProduct',
      id : id
    }
  }

  axios.request(option).then((res)=>{
    console.log(res);

  }).catch((err)=>{
    console.log("connot delete now !");
  })
 }

function cardProduct( {id,link,img ,title ,subtitle , description , action , rating , count ,tag,edit } ) {
  return (
    <div>
      
        <div className="card h-full bg-base-100 p-2 border-solid border-2 border-base-200 rounded-box">
         <Link href={link}>
              <figure className='min-h-52 max-h-52 '>
                {tag ? (
                  <span className="ribbon">{tag}</span>
                ) : (<></>)}
                <Image className='w-full' src={img}  
                    width={100}
                    height={100} 
                    alt={title}
                    priority
                />
                </figure>
              <div className=" min-h-24 max-h-24 bg-base-200 p-1">
                <h6 className="card-title text-sm truncate line-clamp-1">{title} </h6>
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
                <button className="btn btn-xs btn-warning" onClick={edit}>Edit</button>
                <button className="btn btn-xs btn-error" onClick={()=>DeleteProduct(id)}><i className="fa-solid fa-trash-can"></i></button>

            </div>
        </div>
    </div>
  )
}

export default cardProduct