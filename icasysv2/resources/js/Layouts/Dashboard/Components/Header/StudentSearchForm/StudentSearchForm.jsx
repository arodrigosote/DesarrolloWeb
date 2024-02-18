import React from "react";
import { RiSearchLine } from "react-icons/ri";
import '../../../../../../css/app.css'
import { useForm } from "@inertiajs/react";
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
        get(route('alumno.search', data.name))
    }
    return (
        <form onSubmit={search} className="flex items-center justify-center">
            <TextInput id='student-search' name='student-search' placeholder='Buscar alumno' value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
            <ButtonSearch className="" disabled={processing}><RiSearchLine className="font-bolder"></RiSearchLine></ButtonSearch>
        </form>
    )
}
