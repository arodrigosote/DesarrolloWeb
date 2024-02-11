import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { ToastContainer, toast } from 'react-toastify';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, useForkRef, TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    makeStyles,
    MenuList,
    Typography,
} from '@mui/material';
import { RiCircleFill } from "react-icons/ri";
import { Head, useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ButtonPrimary from "@/Components/ButtonPrimary";
import { RiEditBoxLine, RiDeleteBin6Fill, RiArrowDownSFill, RiDeleteBinFill, RiEditBoxFill } from "react-icons/ri";
import { Inertia } from '@inertiajs/inertia';
import Modal from "@/Components/Modal";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";
import ButtonDelete from "@/Components/ButtonDelete";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonCancel from "@/Components/ButtonCancel";
import SecondaryLink from "@/Components/SecondaryLink";
import Avatar from '@mui/material/Avatar';
import Image from "@/Components/Image";
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CImage } from "@coreui/react";
import { router } from '@inertiajs/react'
import ButtonSecondary from "@/Components/ButtonSecondary";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import LessonHeader from "@/Components/LessonHeader";
import LessonLayout from "@/Layouts/LessonLayout/LessonLayout";


const Lesson = ({ auth }) => {
    const {course, url} = usePage().props
    return (
        <>
            <ToastContainer></ToastContainer>
            {console.log(course)}
            <LessonLayout auth={auth} title={course.title}>

            </LessonLayout>
        </>
    )
}

// Index.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default Lesson
