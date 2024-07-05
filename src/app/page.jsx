
'use client'
import CARDPRODUCT from './components/cardProduct'
import CardProductSkeleton from './components/cardProductSkeleton'
import Btncategory from './components/btnCategory'
import Modal from './components/modal'
import Alert from './components/Alert'
import Paginate from './components/pagination'
import { useEffect, useState,useContext } from 'react'
import axios from 'axios';
import { stringify } from 'postcss'
import Link from 'next/link'
import Image from 'next/image'
import FormProduct from './components/formProduct'

const fetchDatafromPage = async (page,perpage,filter,func) =>{
  try{
    const response = await axios.get('/api/FakeStoreApi',{
      params : {
        func : func,
        page : page,
        perpage : perpage,
        filter : JSON.stringify(filter)

      }
    })

    const countData = await axios.get('/api/FakeStoreApi',{
      params : {
        func : 'getPage',
        filter : JSON.stringify(filter)
      }
    })
    return [response , countData]
  }catch(error){
    console.log(error);
  }

}

export default  function Home({searchParams}) {
  const [rangePrice , setrangePrice] = useState()
  const [data, setdata] = useState();
  const [category, secategory] = useState();
  const [Filters, dataFilter] = useState();
  const [typeShipping , setTypeShipping] = useState()
  const [OrderBy , setOrderBy] = useState()

  const [datafirstProduct , setFirstproduct] = useState()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function firstProduct(id){

     const data = await axios.get('/api/FakeStoreApi',{
      params :{
        id : id,
        func : 'firstProduct'
      }
    })

    return data
  }

  async function getTypeShipping(){

    await axios.get('/api/FakeStoreApi',{
      params :{
        func : 'typeShipping'
      }
    }).then((res)=>{
      setTypeShipping(res.data)
    }).catch((err)=>{

      console.log(err);
    })
  }

  async function getTypeOrderBy(){

    await axios.get('/api/FakeStoreApi',{
      params :{
        func : 'OrderBy'
      }
    }).then((res)=>{
      setOrderBy(res.data)
    }).catch((err)=>{

      console.log(err);
    })
  }

  async function getDatafromPage(){
    let page = parseInt(searchParams.page ? searchParams.page : 1) 
    const perpage = 10
    const getData = await fetchDatafromPage(page,perpage,Filters,'category')
    setdata(getData[0].data.getData)
    settotalPage(Math.ceil(getData[1].data.count / perpage))

  }

 const showModalContent = async (params) =>{
    const modal = document.getElementById('my_modal_4');
    modal.showModal();

     const data = await firstProduct(params).then((res)=>{
      console.log(res.data);
      setFirstproduct(res.data)
    }).catch((err)=>{
      console.log(err);
    })
}
const contentCreateProduct = (
 <>
   <FormProduct 
   category = {category}
   typeShipping = {typeShipping}
  dataProduct = {datafirstProduct}
   />
 </>
)
 

   const contentCreateFilter = (
    <>
      {/* <p className='text-md font-semibold mt-2'>Filter</p> */}

      {/* menu */}
      <ul className="menu w-56">
        <li>
          <details open>
            <summary className='font-semibold'><i className="fa-solid fa-layer-group"></i> Category</summary>
            <ul>
              {/* <li onClick={ClearInput}><a> <input type="checkbox" className="checkbox checkbox-sm" /> All</a></li> */}
              {category && category.length > 0 ? (
                category.map((item,index)=>(
                  <li key={index}><a> <input type="checkbox" filter = "category" onClick={getFilter} id={item}  className="checkbox checkbox-sm btn-checkFilter"  /> {item}</a></li>
                ))
              ) : (
                <p>Loading Cate.....</p>
              )}
            </ul>
          </details>
        </li>
        <li>
          <details open>
            <summary className='font-semibold'><i className="fa-solid fa-truck-fast"></i> Shipping</summary>
            <ul>
              {typeShipping && typeShipping.length > 0 ? (
                typeShipping.map((item,index)=>(
                  <li key={index}><a><input type="checkbox" onClick={getFilter} id={item} className="checkbox checkbox-sm btn-filterShipping" /> {item}</a></li>
                ))
              ) : (
                <p>Loading Cate.....</p>
              )}
            </ul>
          </details>
        </li>
        <li>
          <a className='font-semibold'><i className="fa-solid fa-star"></i> Rating</a>
          <div className="rating">
            <input hidden type="radio" name="rating-2" id="ratingDefault" className="mask mask-star-2 bg-orange-400 rating-check" defaultChecked />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 rating-check" id="1" onClick={getFilter} />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 rating-check" id="2" onClick={getFilter} />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 rating-check" id="3" onClick={getFilter} />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 rating-check" id="4" onClick={getFilter} />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400 rating-check" id="5" onClick={getFilter} />
          </div>
          </li>

      </ul>

      <p className='font-semibold text-sm mb-4'>Price</p>
      <div className=''>
        <p>From</p>
        <label className="">
          <input type="number" id="priceStart" className="py-2 text-end text-sm  w-full max-w-xs bg-transparent border-b border-slate-950 focus:outline-none focus:border-slate-950" placeholder="From" />
        </label>
        <p className='mt-6'>To</p>
        <label className="">
          <input type="number" id="priceEnd" className="py-2 text-end text-sm  w-full max-w-xs bg-transparent border-b border-slate-950 focus:outline-none focus:border-slate-950" placeholder="To" />
        </label>
        <div className="flex justify-center mt-2 gap-2">
          <button className="btn btn-success btn-sm text-base-100" onClick={getFilter}>Search Price</button>
          <button className="btn btn-neutral btn-sm" onClick={ClearInput}>Clear</button>

        </div>
      </div>
    </>
   )


     // manage pagination 
  const [totalPage , settotalPage] = useState()
  let prevPage , nextPage
  let page = parseInt(searchParams.page ? searchParams.page : 1) 
  prevPage = page - 1 > 0 ? page - 1 : 1
  nextPage = page < totalPage ? page + 1 : totalPage

  const pageNumber = []
  const offsetPageA = 2
  const offsetPageB = page < 3 ? 5 - page : offsetPageA

  for(let i = page - offsetPageA  ; i <= page+offsetPageB ; i++){
    if(i>=1 && i>= offsetPageA-page && i <= totalPage){
      pageNumber.push(i)
    }
  }

  // end pagination 


 async function getFilter(){

  const checkedIds = Array.from(document.querySelectorAll('.btn-checkFilter:checked'))
                        .map(item => item.id)
                        .join().split(",");

  const filterShipping = Array.from(document.querySelectorAll('.btn-filterShipping:checked'))
                        .map(item => item.id)
                        .join().split(",");

                        
  const filterrating = Array.from(document.querySelectorAll('.rating-check:checked'))
                        .map(item => item.id)
                        .join()


  const priceStart = document.getElementById('priceStart').value
  const priceEnd = document.getElementById('priceEnd').value

  const querys = []

                        let allEmptycheckedIds = checkedIds.every(item => item === "");
                        let allEmptyfilterShipping = filterShipping.every(item => item === "");

                        if(!allEmptycheckedIds){
                          querys.push({
                            category: { 
                                  $in:checkedIds
                                }
                              }
                          )
                        }

                        if(!allEmptyfilterShipping){
                          querys.push({
                            typeShipping: { 
                                  $in:filterShipping
                                }
                              }
                          )
                        }

                        if(filterrating != 'ratingDefault'){
                          querys.push({
                            'rating.rate': { 
                                  $gt: parseInt(filterrating) 
                                }
                              }
                          )
                         
                        }

                        if(priceStart && priceEnd){
                          querys.push({
                            price: {
                              $gte: priceStart,
                              $lte: priceEnd
                            }
                          })
                          

                        }

                        let finalQuery = querys.length > 1 ? { $and: querys } : querys[0] || {};

                        dataFilter(finalQuery)
                        if(true){
                          const getData = await fetchDatafromPage(1,10,finalQuery,'category')
                          setdata(getData[0].data.getData)
                          settotalPage(Math.ceil(getData[1].data.count / 10))
                        }


 }

async function ClearInput(){
    document.getElementById('priceEnd').value = ""
    document.getElementById('priceStart').value = ""

  const getCheckB = document.querySelectorAll('input[type="checkbox"]')
    getCheckB.forEach((item)=>{
      item.checked = false
    })
 
  document.getElementById('ratingDefault').checked = true

  dataFilter('')
  if(true){
    const getData = await fetchDatafromPage(1,10,{},'category')
    setdata(getData[0].data.getData)
    settotalPage(Math.ceil(getData[1].data.count / 10))
  }
}

async function getDataSort(func){
    const getData = await fetchDatafromPage(1,10,Filters,func)
     setdata(getData[0].data.getData)
     settotalPage(Math.ceil(getData[1].data.count / 10))
   
}

   
  useEffect(() => {
    getDatafromPage()
  },[page])

  useEffect(()=>{
      // callGategory
      axios.get('/api/FakeStoreApi',{
        params : {
          func : 'ListCategory'
        }
      }).then((res)=>{
        secategory(res.data);
      }).catch((err)=>{
        console.log(err);
      })
  
        getTypeShipping()
        getTypeOrderBy()
  },[])
  
  return (
    <div>


    {/* drawing filter */}
    <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu bg-slate-200 text-base-content min-h-full w-80 p-4">
            {contentCreateFilter}
          </div>
        </div>
    </div>

    <Modal content={contentCreateProduct} title="Add Product"/>
      {/* contents */}
      <div className="flex flex-col lg:flex-row">
        <div className="w-1/4 hidden md:hidden lg:block xl:block px-4 bg-slate-200">
            {contentCreateFilter}
        </div> 
        {/* <div className="divider lg:divider-horizontal"></div>  */}
        <div className=" place-items-center w-full">

          {/* Thumnails */}

          {/* show page and sort */}

          <div className='flex justify-between w-full mt-2 p-4'>
            <div className='flex items-center'>
              <p className='text-sm font-semibold '>{searchParams.page ? searchParams.page : 1} of {totalPage ? (totalPage) : ('')} for Reault Search </p>

            </div>
            <div>
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="lg:hidden xl:hidden  drawer-button btn btn-primary btn-sm"><i className="fa-solid fa-filter"></i> Filter</label>
              <ul className="menu hidden md:hidden lg:menu-horizontal lg:flex xl:block xl:flex rounded-box gap-1">
                  {OrderBy && OrderBy.length > 0 ? (
                      OrderBy.map((item,i)=>(
                        <span key={i} onClick={()=>{getDataSort(item.txtEng)}
                        }>
                          <Btncategory 
                            key={item.name} // Ensure each item has a unique key
                            name={item.name}
                          />
                        </span>
                      ))
                  ) : (
                    <p>Loading...</p>
                  )}
              </ul>
            </div>
          </div>

          <div className='flex justify-between  mx-6'>
            <div>
              <button className=' hidden md:hidden lg:block xl:block btn btn-success btn-sm text-base-100' onClick={()=>showModalContent(555)} >Create New Product</button>
            </div>

            <div className="">
              <Paginate
                linkPrev = {`?page=${prevPage}`}
                linkNext = {`?page=${nextPage}`}
                page={page}
                pageNumber={pageNumber}
              />
            </div>

          
          </div>



        {(data && data.length > 0) ? (
            <div className="grid  grid-cols-2 md:grid-cols-3 lg:frid-cols-4 xl:grid-cols-5 gap-4 p-5 ">

              {data.map((product,i) => (

                  <CARDPRODUCT 
                    key={i}
                    id={product._id}
                    img={product.image}
                    title={product.title} 
                    subtitle = {product.price}
                    description={product.description} 
                    rating={product.rating ? product.rating.rate : ''}
                    count={product.rating ? product.rating.count : ''}
                    action="Buy now"
                    link = {`/ProductDetail/${product._id}`}
                    tag = {product.typeShipping} 
                    edit = {()=>showModalContent(product._id)}
                  />

              ))}
            
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 p-5 ">
              <CardProductSkeleton/>
              <CardProductSkeleton/>
              <CardProductSkeleton/>
              <CardProductSkeleton/>
              <CardProductSkeleton/>
            </div>
          )
        }


        <div className='grid flex-grow justify-center mb-4'>
             <Paginate
                linkPrev = {`?page=${prevPage}`}
                linkNext = {`?page=${nextPage}`}
                page={page}
                pageNumber={pageNumber}
              />
        </div>

        </div>
      </div>






    </div>
  );
}
