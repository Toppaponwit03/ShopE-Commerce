import React from 'react'

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
function addItems({index,quatity}) {
  return (
    <div className="flex place-items-center">
        <button className='btn btn-neutral btn-xs' onClick={()=>minusQuantity(`quantity-${index}`)}><i className="fa-solid fa-minus"></i></button>
        <input type="text" id={`quantity-${index}`} defaultValue={quatity ?? 0} placeholder="Type here" className="input font-semibold text-xs text-center w-12 bg-transparent border-none focus:outline-none" />
        <button className='btn btn-neutral btn-xs' onClick={()=>plusQuantity(`quantity-${index}`)}><i className="fa-solid fa-plus"></i></button>
  </div>
  )
}

export default addItems