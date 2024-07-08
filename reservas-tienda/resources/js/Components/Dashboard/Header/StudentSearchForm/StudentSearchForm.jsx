import React from "react";
import { RiSearchLine, RiMessage2Fill   } from "react-icons/ri";
import '../../../../../css/app.css'
import { Link, useForm } from "@inertiajs/react";
import { TextField } from "@mui/material";
import TextInput from "@/Components/TextInput";
import ButtonPrimary from "@/Components/ButtonPrimary";
import ButtonSearch from "@/Components/ButtonSearch";

export default function ({ auth }) {
    const { data, setData, delete: destroy, get, post, put, processing, errors, reset } = useForm({
        name: '',
    });

    const search = (e) => {
        e.preventDefault();
        // get(route('alumno.search', data.name))
    }
    return (
        <div className="flex justify-start items-center">
            <form onSubmit={search} className="flex items-center justify-center">
                <TextInput id='student-search' name='student-search' placeholder='Buscar alumno' value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                <ButtonSearch className="" disabled={processing}><RiSearchLine className="font-bolder"></RiSearchLine></ButtonSearch>
            </form>
            <Link href={route('contact.messages')} className="ml-8"><RiMessage2Fill  className="text-2xl text-primary"></RiMessage2Fill ></Link>
        </div>
    )
}
