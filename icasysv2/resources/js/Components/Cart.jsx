import React from 'react';
import '../../css/app.css'
import { CImage } from '@coreui/react';

export default function Cart({ course, url }) {
    return (
        <div>
            <h1 className='text-center text-primary font-bold text-3xl pb-20 bg-lighter pt-40 lg:pt-20'>Finaliza tu compra</h1>
            <div className='block  '>
                <div className='mx-5 lg:mx-36 my-5'>
                    <h2 className='text-secondary font-bold text-xl'>Curso:</h2>
                    <div className='flex items-center'>
                        <CImage rounded thumbnail src={`${url}storage/${course.image}`} className='w-[30%] lg:w-[20%]' alt={course.name} />
                        <h3>{course.title}</h3>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='flex items-center mx-5 lg:mx-36 '>
                        <h2 className='text-secondary font-bold text-xl'>Precio:</h2>
                        <h3 className='text-xl'>{course.price} MXN</h3>
                    </div>
                    <div className='flex items-center mx-5 lg:mx-36'>
                        <h2 className='text-secondary font-bold text-xl'>Cantidad:</h2>
                        <h3 className='text-xl'> 1 </h3>
                    </div>
                    <div className='flex items-center mx-5 lg:mx-36 mt-5 text-center justify-center'>
                        <h2 className='text-primary font-bold text-xl'>Total:</h2>
                        <h3 className='text-xl font-bold'> {` ${course.price}`}MXN</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
