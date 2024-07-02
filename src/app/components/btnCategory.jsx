import React from 'react'
import axios from 'axios'


function btnCategory({name , event}) {
  return (
    <div>
        <button onClick={event} className="btn btn-outline btn-sm">{name}</button>
    </div>
  )
}

export default btnCategory