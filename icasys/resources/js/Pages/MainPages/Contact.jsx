import React from "react";
import Header from "../Components/Header/Header";
import { Head } from '@inertiajs/react';

export default function (auth) {
    return (
        <>
            <Head>
                <title>Inicio</title>
            </Head>
            <Header auth={auth}></Header>
        </>

    )
}
