import React from 'react'
import Link from 'next/link'

function pagination({page , pageNumber,linkPrev , linkNext}) {
  return (
    <>
    
        {pageNumber && pageNumber.length > 0 ? (
            <div>
            <Link href={linkPrev} className="join-item btn btn-circle btn-sm btn-ghost mx-1 ">«</Link>
            {pageNumber.map((item,index)=>(
                <Link 
                href={`?page=${item}`}
                key = {index}
                className={`join-item btn btn-circle btn-sm btn-ghost mx-1  ${page === item ? 'bg-neutral text-base-100' : ''}`}
                >
                {item}
                </Link>
            ))}
            <Link href={linkNext} className="join-item btn btn-circle btn-sm btn-ghost mx-1">»</Link>
            </div>
        ) : (
        <></>
        )}


  </>
  )
}

export default pagination