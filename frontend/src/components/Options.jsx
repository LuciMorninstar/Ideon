import React from 'react'

const Options = ({setForYou, setVideos}) => {
    const options = [
        {  name:"For you",
            onClick:handleForYou
         },
        {  name:"Videos",
            onClick:handleVideos
         },
    ]

    const handleForYou = ()=>{
        setForYou(true);
    }
  return (
    <section className='w-full border-b flex flex-row justify-evenly border-b-gray-700 '>
        {
        options.map((item,i)=>(
        <span onClick={item.onClick} className='text-font-secondary-color font-extrabold'>
        {item.name}
       </span>

            ))
        }
     

    </section>
  )
}

export default Options