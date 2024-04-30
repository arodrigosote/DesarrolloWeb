import React, { useState } from "react";
import StudentSearchForm from "./StudentSearchForm/StudentSearchForm";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import { usePage } from "@inertiajs/react";


export default function () {
    const { auth } = usePage().props
    return (
        <>
            {
                auth.user.rol === 2 ? (
                    <div className="lg:flex md:flex flex justify-between px-4 py-5 bg-white">
                        <StudentSearchForm auth={auth}></StudentSearchForm>
                        <DropdownMenu auth={auth}></DropdownMenu>
                    </div>
                ) : (
                    <div className="lg:flex md:flex items-center justify-end px-4 py-5 bg-white">
                        <DropdownMenu auth={auth}></DropdownMenu>
                    </div>

                )
            }
        </>
    )
}
