import React from 'react'
import Link from 'next/link'

function nav() {
  return (
    <div>
        <div className="navbar bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-base-100 ">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">Home</Link>
            </div>
            <div className="flex-1 justify-start">
            <div className="form-control w-full">
                    <input type="text" placeholder="Search" className="input  rounded-full input-sm text-black" />
                </div>
            </div>
            <div className="flex-none gap-2">


            <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <i className="fa-solid fa-cart-shopping text-xl"></i>
                    <span className="badge badge-sm badge-error text-base-100 indicator-item"><div id="cart" className="cart" data-totalitems="0">
                    </div></span>


                </div>
                </div>
                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                    <span className="font-bold text-lg">8 Items</span>
                    <span className="text-info">Subtotal: $999</span>
                    <div className="card-actions">
                        <Link href={`/Cart/${2}`} className="btn btn-primary btn-block">View cart</Link>
                    </div>
                </div>
                </div>
            </div>
        {/* menu category */}
        {/* <ul className="menu bg-base-100 lg:menu-horizontal rounded-box">
            <li>
            <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Inbox
                <span className="badge badge-sm">99+</span>
            </a>
            </li>
            <li>
            <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Updates
                <span className="badge badge-sm badge-warning">NEW</span>
            </a>
            </li>
            <li>
            <a>
                Stats
                <span className="badge badge-xs badge-info"></span>
            </a>
            </li>
        </ul> */}

        </div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                    </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
                </ul>
            </div>
        </div>  
    </div>
  )
}

export default nav