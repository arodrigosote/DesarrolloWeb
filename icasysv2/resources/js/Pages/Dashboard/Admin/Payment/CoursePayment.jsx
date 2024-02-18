import React from 'react';
import Header from '../../../Components/Header/Header';
import { Head, usePage } from '@inertiajs/react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect } from 'react';
import Cart from '@/Components/Cart';

export default function CoursePayment(auth) {
    const { course, modules, lessons, url, preference, key } = usePage().props;

    useEffect(() => {
        initMercadoPago(key, { locale: 'es-MX' });
    }, []);


    return (
        <>
            <Head>
                <title>Pagar</title>
            </Head>
            <Header auth={auth}></Header>
            <Cart course={course} url={url} preference={preference}></Cart>
            <div className='w-full lg:w-[40%] mx-auto'>
                <div id="wallet_container w-full">
                    <Wallet initialization={{ preferenceId: preference.id, redirectMode: 'modal' }} customization={{ texts: { valueProp: 'smart_option' } }} />
                </div>
            </div>
        </>
    )
}
