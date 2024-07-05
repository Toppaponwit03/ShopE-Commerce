'use client'
import React from 'react'
import axios from 'axios'
import Image from 'next/image';
import { useState ,useEffect } from 'react';





function formProduct({category,typeShipping ,dataProduct}) {
    const [imgPreview ,setImgPreview] = useState()
    const [formData , setFormData] = useState({ 
        title : '',
        price : '',
        description : '',
        category : '',
        image : '',
        category : '',
        typeShipping : ''
    
      })

      const handleInputChange = (e) => {
        const { name, value } = e.target;

        console.log(name , value);
        if(name == 'image'){
          setImgPreview(value)
        }
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      }

      async function ManageProduct(func , method ,formData ,id){
        const dataForm = formData
        var options = {
          method: method,
          url: '/api/FakeStoreApi',
          params: {func: func , id:id},
          headers: {
            Accept: '*/*',
            'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
            'Content-Type': 'application/json'
          },
          data: dataForm
        };
    
       await axios.request(options).then(function (response) {
          alert('Add Product is Successfully !')
          
        }).catch(function (error) {
          console.error(error);
        });
      }


  return (
    <div>
        <div className="grid grid-cols-2 place-items-center">
            <div className='text-center'>
                <div className='flex justify-center'>
                    <Image src={dataProduct ? dataProduct[0].image :  imgPreview } className='w-1/2 imgPreview' width={100} height={100} alt={category}/>
                </div>
                <div className='mt-2'>
                <span className="label-text font-semibold">URL : </span>
                <input type="text" name="image" defaultValue={dataProduct ? dataProduct[0].image : imgPreview} className="input input-bordered input-sm w-full max-w-xs" onChange={handleInputChange} />
                </div>
            </div>
            <div className='gird grid-cols-1'>

                <div className="grid grid-cols-1">
                    <span className="label-text font-semibold my-2">Title :</span>
                    <input type="text" name="title" defaultValue={dataProduct ? dataProduct[0].title : null} className="input input-bordered input-sm w-full max-w-xs" placeholder="Search" onChange={handleInputChange}/>
                </div>

                <div className="grid grid-cols-1">
                    <span className="label-text font-semibold my-2">Price :</span>
                    <input type="text" name="price" defaultValue={dataProduct ? dataProduct[0].price : null} className="input input-bordered input-sm w-full max-w-xs" placeholder="Search" onChange={handleInputChange}/>
                </div>

                <div className="grid grid-cols-1">
                <span className="label-text font-semibold my-2">Description :</span>
                <input type="text" name="description" defaultValue={dataProduct ? dataProduct[0].description : null} className="input input-bordered input-sm w-full max-w-xs" placeholder="Search" onChange={handleInputChange}/>
                </div>

                <div className="label-text font-semibold my-2">Category / Shipping</div>
                <div className="flex flex-cols-2 gap-2">
                    <select className="select select-bordered select-sm  w-full max-w-xs" name="category" onChange={handleInputChange}>
                        <option disabled >Select Category</option>
                        {category && category.length > 0 ? (
                        category.map((item ,i)=>(
                            <option key={i} value={item}>{i+1}. {item} </option>
                        ))
                        ) : (
                        ''
                        )}
                    </select>

                    {/* <div className="label-text font-semibold">Shipping</div> */}
                    <select className="select select-bordered  select-sm w-full max-w-xs" name="typeShipping" onChange={handleInputChange}>
                        <option disabled defaultValue>Select Shipping</option>
                        {typeShipping && typeShipping.length > 0 ? (
                        typeShipping.map((item ,i)=>(
                            <option key={i} value={item}>{i+1}. {item}</option>
                        ))
                        ) : (
                        ''
                        )}
                    </select>
                </div>

                <div className="grid grid-cols-1">
                    <span className="label-text font-semibold my-2">Shipping Rate :</span>
                    <input type="text" name="shippngrate" defaultValue={dataProduct ? dataProduct[0].shippngrate : null} className="input input-bordered input-sm w-full max-w-xs" placeholder="Search" onChange={handleInputChange}/>
                </div>

                    {dataProduct ? (
                        <button className="btn btn-warning btn-sm mt-2 text-base-100" onClick={()=>ManageProduct('updateProduct','PUT',{formData},dataProduct ? dataProduct[0]._id : 0)}>Update Product</button>
                    ) : (
                        <button className="btn btn-success btn-sm mt-2 text-base-100" onClick={()=>ManageProduct('addProduct','POST',{formData},dataProduct ? dataProduct[0]._id : 0)}>Add Product</button>
                    )}

            </div>
        </div>
    </div>
  )
}

export default formProduct