import React from 'react'


function cardProductSkeleton() {
  return (
    <div>
        <div className="card h-full bg-base-100 p-2 border-solid border-2 border-base-200 rounded-none">
              <figure className='min-h-52 max-h-52 '>
                  <div className="skeleton h-full w-full"></div>
                </figure>
              <div className="card-body min-h-36 max-h-52 ">
                 <div className="skeleton h-4 w-full"></div>
                <div className='flex gap-1'>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
                </div>

                <div className="skeleton h-4 w-full"></div>
              </div>
         
            <div className="card-fotter bg-base-200 flex justify-center gap-1">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>

            </div>
        </div>
    </div>
  )
}

export default cardProductSkeleton
