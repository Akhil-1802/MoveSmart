import React from 'react'
import { Button } from '@mui/material';
function User() {
  return (
    <div className='min-h-screen'>
        <div
        className='w-[80%] max-w-7xl flex items-center h-96  mx-auto my-16  justify-evenly'>
            
            <div
            className=''>
                <h1 className='font-bold flex flex-col gap-3'>
                  <span className='text-6xl '>Track Buses</span> 
                  <span className='text-6xl flex-start'>Near You...</span></h1>
                <p className='text-center mt-4 text-xl'>See all the buses near your location..</p>
                <div className='mt-5 flex gap-6'>
                <Button sx={{
                  borderRadius: '16px',
                }} variant="contained">Start Tracking</Button>
                <Button variant="outlined">Help</Button>
                </div>
            </div>
                <img width={500} height={500} src="https://preview.colorlib.com/theme/launch/images/market-launch-pana.svg" alt="" />

        </div>
        <div
        className='w-[80%] max-w-7xl flex items-center h-96  mx-auto my-6  justify-evenly'>
              <img className='rounded-lg' width={350} height={350} src="/bus.jpg" alt="" />

            <div
            className=''>
                <h1 className='font-bold flex flex-col gap-3'>
                  <span className='text-6xl '>Track Buses</span> 
                  <span className='text-6xl flex-start'>Near You...</span></h1>
                <p className='text-center mt-4 text-xl'>See all the buses near your location..</p>
                <div className='mt-5 flex gap-6'>
                <Button sx={{
                  borderRadius: '16px',
                }} variant="contained">Start Tracking</Button>
                <Button variant="outlined">Help</Button>
                </div>
            </div>
              
        </div>
     
    </div>
  )
}

export default User
