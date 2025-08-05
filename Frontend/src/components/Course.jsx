import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';

const Course = () => {
  const [book,setBook]=useState([])
 useEffect(() => {
  const getBook = async () => {
    try {
const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book`);
      console.log(res.data);  // Fixed the typo: comma to period
      setBook(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  getBook();  // Ensure the function is called
}, []);




  return (
    <>
        <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
            <div className='mt-28 items-center justify-center text-center'>
              <h1 className='text-2xl md:text-4xl'>
                We 're delighted to have you 
                <span className='text-pink-600'> here'</span>
              </h1>  
              <p className='mt-14'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
                  nulla sit amet luctus placerat, arcu nulla tincidunt ligula, non tempus justo 
                  lacus in metus. Cras pulvinar, quam a varius posuere, sapien turpis viverra libero,
                   et vehicula enim turpis eget sapien. Morbi finibus, orci et ultrices sodales, ligula
                    sapien dictum felis, eget feugiat velit quam vitae purus. Curabitur efficitur mi a volutpat facilisis.Pellentesque 
                  habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
              </p>
             <a href="/"> <button className='bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>
                  Back
              </button>
              </a>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left'>
                
                {book.map((item)=>{
                  return <Card key={item.id} item={item}/>
                })

                }
              </div>
              
            </div>

        </div>


      
    </>
  )
}

export default Course
