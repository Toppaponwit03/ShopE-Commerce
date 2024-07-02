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


    </div>


    
  )
}

export default Product