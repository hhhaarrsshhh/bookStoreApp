import React from 'react'

const Card = ({item}) => {
  return (<>
    <div className='mt-4 my-3 p-3 ' >
        <div className="card bg-base-100 w-96 shadow-xl hover:scale-105">
  <figure>
    <img
      src={item.img1}
      
      alt="books" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {item.name}
      <div className="badge badge-secondary">{item.category}</div>
    </h2>
    <p>{item.title}</p>

    <div className="card-actions justify-between">

      <div className="badge badge-outline">${item.price}</div>

      <div className="badge badge-outline hover:bg-pink-400 rounded-full border-[2px] px-2 py-4 hover:text-white duration-400">Buy now</div>
    </div>
  </div>
</div>
      
    </div>
  </>)
}

export default Card
