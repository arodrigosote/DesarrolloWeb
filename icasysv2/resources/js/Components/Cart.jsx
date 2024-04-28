import React from 'react';
import { CImage } from '@coreui/react';

export default function Cart({ course, url }) {
    return (
        <div>
            <h1 className='text-center text-primary font-bold text-3xl pb-20 bg-lighter pt-40 lg:pt-20'>Finaliza tu compra</h1>

            <table className='mb-10 mt-10 mx-0 lg:mx-36 shadow-lg'>
                <thead className='bg-primary'>
                    <tr>
                        <th className='text-white p-7 w-[60%] font-bold text-center lg:text-left'>Curso</th>
                        <th className='text-white p-7 w-[15%] font-bold text-center lg:text-left'>Precio</th>
                        <th className='text-white p-7 w-[15%] font-bold text-center lg:text-left'>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className='block lg:flex items-center p-4'>
                                <CImage rounded thumbnail src={`${url}storage/${course.image}`} className='w-[100%] lg:w-[20%]' alt={course.name} />
                                <div>
                                    <h3 className='px-3 '><strong>{course.title}</strong></h3>
                                    <h3 className='px-3 text-gray-500   '>{course.coursecategory.name}</h3>
                                </div>
                            </div>
                        </td>
                        <td>
                            <h3 className='text-sm lg:text-left text-center lg:text-lg'>{course.price} MXN</h3>
                        </td>
                        <td>
                            <h3 className='text-sm lg:text-left text-center lg:text-lg font-bold'>{`${course.price} MXN`}</h3>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* <div className='block  '>
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
                        <h3 className='text-xl font-bold'>{` ${course.price}`}MXN</h3>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
