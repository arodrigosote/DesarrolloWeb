import ButtonPrimary from '@/Components/ButtonPrimary';
import CardPrimary from '@/Components/CardPrimary';
import { RiHotelFill, RiSortAlphabetAsc, RiEditBoxFill, RiDeleteBin5Fill, RiEyeFill } from "react-icons/ri";
import DashboardLayout from '@/Layouts/Dashboard/DashboardLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CImage } from "@coreui/react";
import { useEffect, useRef, useState } from 'react';
import ButtonSecondary from '@/Components/ButtonSecondary';
import ButtonEdit from '@/Components/ButtonEdit';
import ButtonDelete from '@/Components/ButtonDelete';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import ButtonCancel from '@/Components/ButtonCancel';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import '../../../css/app.css'
import Modal from '@/Components/Modal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export default function PatientShow(props) {
    const { patient, fullinfo, sales, auth, toast: toastProp, url } = usePage().props;

    const getCssVariable = (variable) => {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    };

    // ---------------------------------------------------------------------------------------
    // Toast Notification --------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------
    const [toastInfo, setToastInfo] = useState(null);

    useEffect(() => {
        // Verificar si hay información de "toast" y mostrar el "toast" correspondiente
        if (toastProp) {
            setToastInfo(toastProp);
        }
    }, [toastProp]);

    useEffect(() => {
        // Mostrar el "toast" cuando se actualice el estado local
        if (toastInfo) {
            toast[toastInfo.tipo](toastInfo.mensaje);
            setToastInfo(null); // Limpiar el estado después de mostrar el "toast"
        }
    }, [toastInfo]);

    // ---------------------------------------------------------------------------------------
    // SUBMIT AND MODAL-----------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);

    const user_idInput = useRef();
    const nameInput = useRef();
    const addressInput = useRef();
    const phoneInput = useRef();
    const ageInput = useRef();
    const genderInput = useRef();
    const publicity_methodInput = useRef();
    const ailmentsInput = useRef();
    const backgroundInput = useRef();
    const emailInput = useRef();

    const { data, setData, delete: destroy, post, get, put, processing, progress, errors, reset } = useForm({
        id: '',
        user_id: '',
        name: '',
        address: '',
        phone: '',
        age: '',
        gender: '',
        publicity_method: '',
        ailments: '',
        background: '',
        email: '',
    });


    //MODAL
    const openModal = (op, id, user_id, name, address, phone, age, gender, publicity_method, ailments, background, email) => {
        setModal(true);
        setOperation(op);
        setData({
            id: '',
            user_id: '',
            name: '',
            address: '',
            phone: '',
            age: '',
            gender: '',
            publicity_method: '',
            ailments: '',
            background: '',
            email: '',
        })
        if (op === 1) {
            setTitle('Crear paciente');
        } else {
            setTitle('Editar paciente');
            setData({
                id: id,
                user_id: user_id,
                name: name,
                address: address,
                phone: phone,
                age: age,
                gender: gender,
                publicity_method: publicity_method,
                ailments: ailments,
                background: background,
                email: email,
            })
        }
    }
    const closeModal = () => {
        setModal(false);
    }

    //SUBMIT SECTION
    const save = (e) => {
        e.preventDefault();

        if (operation === 1) {
            post(route('patient.store'), {
                onSuccess: () => { ok('Paciente creado con éxito') },
            });
        } else {
            post(route('patient.update', data.id), {
                onSuccess: () => { ok('Paciente editado con éxito') },
            });
        }
    }

    const ok = (message) => {
        reset();
        closeModal();
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: getCssVariable('--color1') })

    };

    // ---------------------------------------------------------------------------------------
    // DELETE MODAL --------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------
    const [deleteModal, setDeleteModal] = useState(false);

    const openDeleteModal = (id, name) => {
        setDeleteModal(true);
        setData({
            id: id,
            name: name,
        })
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    const borrar = (e) => {
        e.preventDefault();
        destroy(route('patient.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Paciente eliminado con éxito.') },
        });
    }

    //Handle logo
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setData('logo', file); // Actualiza el estado solo con el archivo de logo
    };

    const handleShowPatient = (id) => {
        get(route('patient.show', id))
    }

    const [enable, setEnable] = useState(true);

    const patient_idInput = useRef();
    const companionInput = useRef();
    const groupInput = useRef();
    const workInput = useRef();
    const common_enviromentInput = useRef();
    const strong_noiseInput = useRef();
    const isAloneInput = useRef();
    const high_pressureInput = useRef();
    const hasCardiovascularProblemsInput = useRef();
    const hasDiabetesInput = useRef();
    const hasNervousDisorderInput = useRef();
    const hasFaintingInput = useRef();
    const hasVomitInput = useRef();
    const hasDizzinessInput = useRef();
    const hasNeurologicalProblemsInput = useRef();
    const hasAllergiesInput = useRef();
    const hasWeightProblemsInput = useRef();
    const othersInput = useRef();
    const useGlassesInput = useRef();
    const hasusedAntibioticInput = useRef();
    const hasItchInput = useRef();
    const hasPainInput = useRef();
    const hasFlowInput = useRef();
    const hasEarPlugInput = useRef();
    const hasORLInput = useRef();
    const hasSinusitisInput = useRef();
    const hasCatarroInput = useRef();
    const hasBreathIssuesInput = useRef();
    const hasFamilyDeafnessInput = useRef();
    const hasEarAllergyInput = useRef();
    const hasNoseAllergyInput = useRef();
    const isSmokerInput = useRef();
    const hasTinitusInput = useRef();
    const whichearInput = useRef();
    const whaattimeInput = useRef();
    const descriptionInput = useRef();
    const hasSurgicalInterventionInput = useRef();
    const earCleaningInput = useRef();
    const hosDoesEarCleaningInput = useRef();
    const visitOtorrineMedicianInput = useRef();
    const whoisInput = useRef();
    const bestEarInput = useRef();
    const phoneEarInput = useRef();
    const timeProblemsInput = useRef();
    const howLongInput = useRef();
    const causeInput = useRef();
    const problemsInNormalConverInput = useRef();
    const inGroupsInput = useRef();
    const anyDangerNoiseInput = useRef();
    const leftRightInput = useRef();
    const motorCoordinationInput = useRef();
    const whatDDoYouWaitInput = useRef();
    const doYouKnowAuditiveInput = useRef();
    const whatDoYouThinkInput = useRef();
    const whatDoYouExpectInput = useRef();
    const whatAreYouInterestInput = useRef();

    // Segundo formulario
    const { data: data2, setData: setData2, delete: delete2, post: post2, get: get2, put: put2, processing: processing2, progress: progress2, errors: errors2, reset: reset2 } = useForm({
        id: fullinfo.id,
        patient_id: fullinfo.patient_id,
        companion: fullinfo.companion,
        group: fullinfo.group,

        work: fullinfo.work,
        common_enviroment: fullinfo.common_enviroment,
        strong_noise: fullinfo.strong_noise,
        isAlone: fullinfo.isAlone === 1,

        high_pressure: fullinfo.high_pressure,
        hasCardiovascularProblems: fullinfo.hasCardiovascularProblems === 1,
        hasDiabetes: fullinfo.hasDiabetes === 1,
        hasNervousDisorder: fullinfo.hasNervousDisorder === 1,
        hasFainting: fullinfo.hasFainting === 1,
        hasVomit: fullinfo.hasVomit === 1,
        hasDizziness: fullinfo.hasDizziness === 1,
        hasNeurologicalProblems: fullinfo.hasNeurologicalProblems === 1,
        hasAllergies: fullinfo.hasAllergies === 1,
        hasWeightProblems: fullinfo.hasWeightProblems === 1,
        others: fullinfo.others,
        useGlasses: fullinfo.useGlasses === 1,
        hasusedAntibiotic: fullinfo.hasusedAntibiotic === 1,

        hasItch: fullinfo.hasItch === 1,
        hasPain: fullinfo.hasPain === 1,
        hasFlow: fullinfo.hasFlow === 1,
        hasEarPlug: fullinfo.hasEarPlug === 1,
        hasORL: fullinfo.hasORL === 1,
        hasSinusitis: fullinfo.hasSinusitis === 1,
        hasCatarro: fullinfo.hasCatarro === 1,
        hasBreathIssues: fullinfo.hasBreathIssues === 1,
        hasFamilyDeafness: fullinfo.hasFamilyDeafness === 1,
        hasEarAllergy: fullinfo.hasEarAllergy === 1,
        hasNoseAllergy: fullinfo.hasNoseAllergy === 1,
        isSmoker: fullinfo.isSmoker === 1,
        hasTinitus: fullinfo.hasTinitus === 1,
        whichear: fullinfo.whichear,
        whaattime: fullinfo.whaattime,
        description: fullinfo.description,
        hasSurgicalIntervention: fullinfo.hasSurgicalIntervention === 1,
        earCleaning: fullinfo.earCleaning,
        hosDoesEarCleaning: fullinfo.hosDoesEarCleaning,
        visitOtorrineMedician: fullinfo.visitOtorrineMedician === 1,
        whois: fullinfo.whois,

        bestEar: fullinfo.bestEar,
        phoneEar: fullinfo.phoneEar,
        timeProblems: fullinfo.timeProblems,
        howLong: fullinfo.howLong,
        cause: fullinfo.cause,
        problemsInNormalConver: fullinfo.problemsInNormalConver,
        inGroups: fullinfo.inGroups,
        anyDangerNoise: fullinfo.anyDangerNoise,
        leftRight: fullinfo.leftRight,
        motorCoordination: fullinfo.motorCoordination,
        whatDDoYouWait: fullinfo.whatDDoYouWait,

        doYouKnowAuditive: fullinfo.doYouKnowAuditive,
        whatDoYouThink: fullinfo.whatDoYouThink,
        whatDoYouExpect: fullinfo.whatDoYouExpect,
        whatAreYouInterest: fullinfo.whatAreYouInterest,
    });



    //SUBMIT SECTION
    const submitFullData = (e) => {
        e.preventDefault();
        post2(route('patient.update.fulldata', data2.id), {
            onSuccess: () => { okFullData('Paciente editado con éxito') },
        });
    }

    const okFullData = (message) => {
        reset();
        closeModal();
        setEnable(!enable);
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: getCssVariable('--color1') })

    };


    const handleEditFullinfo = () => {
        setEnable(!enable);
    }

    return (
        <>
            <ToastContainer />
            <DashboardLayout user={auth.user} title={patient.name}>
                <div className="lg:flex sm:block">
                    <div className="lg:w-[100%] w-[100%]">
                        <h1 className="text-primary font-bold text-xl my-5">Información del paciente.</h1>
                        <div className='flex'>
                            <div>
                                <p className=""><strong>Nombre:</strong> {patient.name}</p>
                                <p className=""><strong>Dirección:</strong> {patient.address}</p>
                                <p className=""><strong>Teléfono:</strong> {patient.phone}</p>
                                <p className=""><strong>Email:</strong> {patient.email}</p>
                                <p className=""><strong>Edad:</strong> {patient.age} años</p>
                            </div>
                            <div className='ml-9'>
                                <p className=""><strong>Género:</strong> {patient.gender}</p>
                                <p className=""><strong>Método publicitario:</strong> {patient.publicity_method}</p>
                                <p className="mt-3"><strong>Padecimientos:</strong> {patient.ailments}</p>
                                <p className="mt-3"><strong>Antecedentes:</strong> {patient.background}</p>
                            </div>
                        </div>
                        <div className="sm:block justify-start mt-4">
                            <ButtonEdit className="sm:w-[100%] lg:w-auto" onClick={() => { openModal(2, patient.id, patient.user_id, patient.name, patient.address, patient.phone, patient.age, patient.gender, patient.publicity_method, patient.ailments, patient.background, patient.email) }}>Editar</ButtonEdit>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <Tabs>
                        <TabList className="flex space-x-4 border-cyan-600 border bg-color1 text-white">
                            <Tab className="py-2 px-4 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md" selectedClassName="bg-cyan-500">
                                Información completa
                            </Tab>
                            <Tab className="py-2 px-4 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md" selectedClassName="bg-cyan-500">
                                Estudios
                            </Tab>
                            <Tab className="py-2 px-4 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md" selectedClassName="bg-cyan-500">
                                Historal clínico
                            </Tab>
                            <Tab className="py-2 px-4 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md" selectedClassName="bg-cyan-500">
                                Productos
                            </Tab>
                            <Tab className="py-2 px-4 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md" selectedClassName="bg-cyan-500">
                                Garantías
                            </Tab>
                        </TabList>

                        <TabPanel className='ml-4'>
                            <form onSubmit={submitFullData} className="p-6" encType="multipart/form-data" method="POST">
                                <div className='w-full flex justify-between'>
                                    <h3 className="text-xl font-bold mb-4">Sección B: Entorno acústico</h3>
                                    {enable ?
                                        <ButtonEdit type='button' onClick={() => { handleEditFullinfo() }}>Editar</ButtonEdit>
                                        :
                                        <div className='flex'>
                                            <ButtonCancel type='button' disabled={processing2} onClick={() => { handleEditFullinfo() }}>Cancelar</ButtonCancel>
                                            <ButtonPrimary disabled={processing2}>Enviar</ButtonPrimary>
                                        </div>
                                    }
                                </div>
                                <InputLabel className='text-gray-600' htmlFor='work'>Trabajo:</InputLabel>
                                <TextInput className='w-full mb-4' disabled={enable} id='work' name='work' ref={workInput} value={data2.work} onChange={(e) => setData2('work', e.target.value)}></TextInput>
                                <InputError message={errors2.work}></InputError>

                                <InputLabel className='text-gray-600' htmlFor='common_enviroment'>Ambientes comúnes:</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='common_enviroment'
                                    name='common_enviroment'
                                    ref={common_enviromentInput}
                                    value={data2.common_enviroment}
                                    onChange={(e) => setData2('common_enviroment', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.common_enviroment}></InputError>

                                <div className='flex mb-5'>
                                    <div className='flex items-center'>
                                        <InputLabel className='text-gray-600' htmlFor='strong_noise'>¿Exposición a ruidos fuertes?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='strong_noise'
                                            name='strong_noise'
                                            checked={data2.strong_noise}
                                            onChange={(e) => setData2({ ...data2, strong_noise: e.target.checked })}
                                        />
                                        <InputError message={errors2.strong_noise}></InputError>
                                    </div>
                                    <div className='flex items-center'>
                                        <InputLabel className='text-gray-600' htmlFor='isAlone'>¿Vive solo(a)?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='isAlone'
                                            name='isAlone'
                                            checked={data2.isAlone}
                                            onChange={(e) => setData2({ ...data2, isAlone: e.target.checked })}
                                        />
                                        <InputError message={errors2.isAlone}></InputError>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-4">Sección C: El Estado General de Salud</h3>
                                <div className='lg:flex block mb-5'>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='high_pressure'>¿Presión alta?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='high_pressure'
                                            name='high_pressure'
                                            checked={data2.high_pressure}
                                            onChange={(e) => setData2({ ...data2, high_pressure: e.target.checked })}
                                        />
                                        <InputError message={errors2.high_pressure}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasCardiovascularProblems'>¿Problemas cardiovasculares?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasCardiovascularProblems'
                                            name='hasCardiovascularProblems'
                                            checked={data2.hasCardiovascularProblems}
                                            onChange={(e) => setData2({ ...data2, hasCardiovascularProblems: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasCardiovascularProblems}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasDiabetes'>¿Diabetes?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasDiabetes'
                                            name='hasDiabetes'
                                            checked={data2.hasDiabetes}
                                            onChange={(e) => setData2({ ...data2, hasDiabetes: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasDiabetes}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasNervousDisorder'>¿Alteración nerviosa?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasNervousDisorder'
                                            name='hasNervousDisorder'
                                            checked={data2.hasNervousDisorder}
                                            onChange={(e) => setData2({ ...data2, hasNervousDisorder: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasNervousDisorder}></InputError>
                                    </div>
                                </div>

                                <div className='lg:flex block mb-5'>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasFainting'>¿Desmayo?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasFainting'
                                            name='hasFainting'
                                            checked={data2.hasFainting}
                                            onChange={(e) => setData2({ ...data2, hasFainting: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasFainting}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasVomit'>¿Vomito?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasVomit'
                                            name='hasVomit'
                                            checked={data2.hasVomit}
                                            onChange={(e) => setData2({ ...data2, hasVomit: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasVomit}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasDizziness'>¿Mareos?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasDizziness'
                                            name='hasDizziness'
                                            checked={data2.hasDizziness}
                                            onChange={(e) => setData2({ ...data2, hasDizziness: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasDizziness}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasNeurologicalProblems'>¿Problemas neorológicos?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasNeurologicalProblems'
                                            name='hasNeurologicalProblems'
                                            checked={data2.hasNeurologicalProblems}
                                            onChange={(e) => setData2({ ...data2, hasNeurologicalProblems: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasNeurologicalProblems}></InputError>
                                    </div>
                                </div>

                                <div className='lg:flex block mb-5'>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasAllergies'>¿Alergias?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasAllergies'
                                            name='hasAllergies'
                                            checked={data2.hasAllergies}
                                            onChange={(e) => setData2({ ...data2, hasAllergies: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasAllergies}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasWeightProblems'>¿Pérdida o ganancia rápida de peso?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasWeightProblems'
                                            name='hasWeightProblems'
                                            checked={data2.hasWeightProblems}
                                            onChange={(e) => setData2({ ...data2, hasWeightProblems: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasWeightProblems}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='useGlasses'>¿Utiliza lentes?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='useGlasses'
                                            name='useGlasses'
                                            checked={data2.useGlasses}
                                            onChange={(e) => setData2({ ...data2, useGlasses: e.target.checked })}
                                        />
                                        <InputError message={errors2.useGlasses}></InputError>
                                    </div>


                                </div>
                                <div className='flex items-center mx-5 mb-3'>
                                    <InputLabel className='text-gray-600' htmlFor='hasusedAntibiotic'>¿Antibióticos u ototóxicos que se hayan tomado por largo tiempo?</InputLabel>
                                    <Checkbox
                                        className='mb-4'
                                        disabled={enable}
                                        id='hasusedAntibiotic'
                                        name='hasusedAntibiotic'
                                        checked={data2.hasusedAntibiotic}
                                        onChange={(e) => setData2({ ...data2, hasusedAntibiotic: e.target.checked })}
                                    />
                                    <InputError message={errors2.hasusedAntibiotic}></InputError>
                                </div>
                                <InputLabel className='text-gray-600' htmlFor='others'>Otros problemas de salud: </InputLabel>
                                <TextField
                                    multiline
                                    className="w-full"
                                    disabled={enable}
                                    rows={1}
                                    id="others"
                                    name="others"
                                    ref={othersInput}
                                    value={data.others || ''}
                                    onChange={(e) => setData('others', e.target.value)}
                                />
                                <InputError message={errors2.others}></InputError>

                                <h3 className="text-xl font-bold my-5">Sección D: Males en Oídos Y Órganos Conexos</h3>
                                <div className='lg:flex block mb-5'>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasItch'>¿Comezón?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasItch'
                                            name='hasItch'
                                            checked={data2.hasItch}
                                            onChange={(e) => setData2({ ...data2, hasItch: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasItch}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasPain'>¿Dolor?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasPain'
                                            name='hasPain'
                                            checked={data2.hasPain}
                                            onChange={(e) => setData2({ ...data2, hasPain: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasPain}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasFlow'>¿Flujo?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasFlow'
                                            name='hasFlow'
                                            checked={data2.hasFlow}
                                            onChange={(e) => setData2({ ...data2, hasFlow: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasFlow}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasEarPlug'>¿Tapazón de oídos?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasEarPlug'
                                            name='hasEarPlug'
                                            checked={data2.hasEarPlug}
                                            onChange={(e) => setData2({ ...data2, hasEarPlug: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasEarPlug}></InputError>
                                    </div>
                                </div>
                                <div className='lg:flex block mb-5'>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasORL'>¿Males de ORL por largo tiempo?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasORL'
                                            name='hasORL'
                                            checked={data2.hasORL}
                                            onChange={(e) => setData2({ ...data2, hasORL: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasORL}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasSinusitis'>¿Sinusitis?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasSinusitis'
                                            name='hasSinusitis'
                                            checked={data2.hasSinusitis}
                                            onChange={(e) => setData2({ ...data2, hasSinusitis: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasSinusitis}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasCatarro'>¿Catarro crónico?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasCatarro'
                                            name='hasCatarro'
                                            checked={data2.hasCatarro}
                                            onChange={(e) => setData2({ ...data2, hasCatarro: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasCatarro}></InputError>
                                    </div>

                                </div>
                                <div className='lg:flex block mb-5'>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasBreathIssues'>¿Dificultades para respirar por la nariz?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasBreathIssues'
                                            name='hasBreathIssues'
                                            checked={data2.hasBreathIssues}
                                            onChange={(e) => setData2({ ...data2, hasBreathIssues: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasBreathIssues}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasFamilyDeafness'>¿Sordera en familia?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasFamilyDeafness'
                                            name='hasFamilyDeafness'
                                            checked={data2.hasFamilyDeafness}
                                            onChange={(e) => setData2({ ...data2, hasFamilyDeafness: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasFamilyDeafness}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasEarAllergy'>¿Alergia en oídos?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasEarAllergy'
                                            name='hasEarAllergy'
                                            checked={data2.hasEarAllergy}
                                            onChange={(e) => setData2({ ...data2, hasEarAllergy: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasEarAllergy}></InputError>
                                    </div>

                                </div>

                                <div className='lg:flex block mb-5'>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasNoseAllergy'>¿Alergia en nariz?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasNoseAllergy'
                                            name='hasNoseAllergy'
                                            checked={data2.hasNoseAllergy}
                                            onChange={(e) => setData2({ ...data2, hasNoseAllergy: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasNoseAllergy}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='isSmoker'>¿Fuma?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='isSmoker'
                                            name='isSmoker'
                                            checked={data2.isSmoker}
                                            onChange={(e) => setData2({ ...data2, isSmoker: e.target.checked })}
                                        />
                                        <InputError message={errors2.isSmoker}></InputError>
                                    </div>
                                    <div className='flex items-center mx-5'>
                                        <InputLabel className='text-gray-600' htmlFor='hasTinitus'>¿Tinitus?</InputLabel>
                                        <Checkbox
                                            className='mb-4'
                                            disabled={enable}
                                            id='hasTinitus'
                                            name='hasTinitus'
                                            checked={data2.hasTinitus}
                                            onChange={(e) => setData2({ ...data2, hasTinitus: e.target.checked })}
                                        />
                                        <InputError message={errors2.hasTinitus}></InputError>
                                    </div>

                                </div>

                                <InputLabel className='text-gray-600' htmlFor='whichear'>¿En qué oído tiene tinitus?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='whichear'
                                    name='whichear'
                                    ref={whichearInput}
                                    value={data2.whichear}
                                    onChange={(e) => setData2('whichear', e.target.value)}
                                    placeholder='Si no es ninguno, dejar en blanco'>
                                </TextInput>
                                <InputError message={errors2.whichear}></InputError>
                                <InputLabel className='text-gray-600' htmlFor='whaattime'>¿A qué hora?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='whaattime'
                                    name='whaattime'
                                    ref={whaattimeInput}
                                    value={data2.whaattime}
                                    onChange={(e) => setData2('whaattime', e.target.value)}
                                >
                                </TextInput>
                                <InputError message={errors2.whaattime}></InputError>

                                <InputLabel className='text-gray-600' htmlFor='description'>Descripción: </InputLabel>
                                <TextField
                                    multiline
                                    className="w-full"
                                    disabled={enable}
                                    rows={1}
                                    id="description"
                                    name="description"
                                    ref={descriptionInput}
                                    value={data.description || ''}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors2.description}></InputError>

                                <InputLabel className='text-gray-600 mt-4' htmlFor='earCleaning'>¿Con qué frecuencia se limpia los oídos?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='earCleaning'
                                    name='earCleaning'
                                    ref={earCleaningInput}
                                    value={data2.earCleaning}
                                    onChange={(e) => setData2('earCleaning', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.earCleaning}></InputError>

                                <InputLabel className='text-gray-600' htmlFor='hosDoesEarCleaning'>¿Cómo lo efectúa?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='hosDoesEarCleaning'
                                    name='hosDoesEarCleaning'
                                    ref={hosDoesEarCleaningInput}
                                    value={data2.hosDoesEarCleaning}
                                    onChange={(e) => setData2('hosDoesEarCleaning', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.hosDoesEarCleaning}></InputError>

                                <div className='flex items-center mx-5'>
                                    <InputLabel className='text-gray-600' htmlFor='hasSurgicalIntervention'>¿Intervensión qurúrgica en oídos?</InputLabel>
                                    <Checkbox
                                        className='mb-4'
                                        disabled={enable}
                                        id='hasSurgicalIntervention'
                                        name='hasSurgicalIntervention'
                                        checked={data2.hasSurgicalIntervention}
                                        onChange={(e) => setData2({ ...data2, hasSurgicalIntervention: e.target.checked })}
                                    />
                                    <InputError message={errors2.hasSurgicalIntervention}></InputError>
                                </div>
                                <div className='flex items-center mx-5'>
                                    <InputLabel className='text-gray-600' htmlFor='visitOtorrineMedician'>¿Visita al médico otorrino?</InputLabel>
                                    <Checkbox
                                        className='mb-4'
                                        disabled={enable}
                                        id='visitOtorrineMedician'
                                        name='visitOtorrineMedician'
                                        checked={data2.visitOtorrineMedician}
                                        onChange={(e) => setData2({ ...data2, visitOtorrineMedician: e.target.checked })}
                                    />
                                    <InputError message={errors2.visitOtorrineMedician}></InputError>
                                </div>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='whois'>¿Quién es?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='whois'
                                    name='whois'
                                    ref={whoisInput}
                                    value={data2.whois}
                                    onChange={(e) => setData2('whois', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.whois}></InputError>

                                <h3 className="text-xl font-bold my-4">Sección E: Apreciación Subjetiva</h3>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='bestEar'>¿Con qué oído oye mejor?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='bestEar'
                                    name='bestEar'
                                    ref={bestEarInput}
                                    value={data2.bestEar}
                                    onChange={(e) => setData2('bestEar', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.bestEar}></InputError>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='phoneEar'>¿Con qué oído telefonea?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='phoneEar'
                                    name='phoneEar'
                                    ref={phoneEarInput}
                                    value={data2.phoneEar}
                                    onChange={(e) => setData2('phoneEar', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.phoneEar}></InputError>

                                <InputLabel className='text-gray-600' htmlFor='timeProblems'>¿En qué momentos se manifiestan sus problemas auditivos? </InputLabel>
                                <TextField
                                    multiline
                                    className="w-full"
                                    disabled={enable}
                                    rows={1}
                                    id="timeProblems"
                                    name="timeProblems"
                                    ref={timeProblemsInput}
                                    value={data.timeProblems || ''}
                                    onChange={(e) => setData('timeProblems', e.target.value)}
                                />
                                <InputError message={errors2.timeProblems}></InputError>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='howLong'>¿Desde cuándo los tiene?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='howLong'
                                    name='howLong'
                                    ref={howLongInput}
                                    value={data2.howLong}
                                    onChange={(e) => setData2('howLong', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.howLong}></InputError>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='cause'>¿Qué los causó?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='cause'
                                    name='cause'
                                    ref={causeInput}
                                    value={data2.cause}
                                    onChange={(e) => setData2('cause', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.cause}></InputError>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='problemsInNormalConver'>¿Hay problemas en conversación tranquila?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='problemsInNormalConver'
                                    name='problemsInNormalConver'
                                    ref={problemsInNormalConverInput}
                                    value={data2.problemsInNormalConver}
                                    onChange={(e) => setData2('problemsInNormalConver', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.problemsInNormalConver}></InputError>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='inGroups'>¿En grupos?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='inGroups'
                                    name='inGroups'
                                    ref={inGroupsInput}
                                    value={data2.inGroups}
                                    onChange={(e) => setData2('inGroups', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.inGroups}></InputError>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='anyDangerNoise'>¿Hay algún ruido que le lastime?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='anyDangerNoise'
                                    name='anyDangerNoise'
                                    ref={anyDangerNoiseInput}
                                    value={data2.anyDangerNoise}
                                    onChange={(e) => setData2('anyDangerNoise', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.anyDangerNoise}></InputError>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='leftRight'>¿Zurdo o derecho?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='leftRight'
                                    name='leftRight'
                                    ref={leftRightInput}
                                    value={data2.leftRight}
                                    onChange={(e) => setData2('leftRight', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.leftRight}></InputError>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='motorCoordination'>¿Coordinación motora?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='motorCoordination'
                                    name='motorCoordination'
                                    ref={motorCoordinationInput}
                                    value={data2.motorCoordination}
                                    onChange={(e) => setData2('motorCoordination', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.motorCoordination}></InputError>

                                <InputLabel className='text-gray-600' htmlFor='whatDDoYouWait'>¿Qué espera concretamente de nosotros? </InputLabel>
                                <TextField
                                    multiline
                                    className="w-full"
                                    disabled={enable}
                                    rows={2}
                                    id="whatDDoYouWait"
                                    name="whatDDoYouWait"
                                    ref={whatDDoYouWaitInput}
                                    value={data.whatDDoYouWait || ''}
                                    onChange={(e) => setData('whatDDoYouWait', e.target.value)}
                                />
                                <InputError message={errors2.whatDDoYouWait}></InputError>

                                <h3 className="text-xl font-bold my-4">Sección F: Conocimiento Sobre Aparatos Auditivos</h3>
                                <InputLabel className='text-gray-600 mt-3' htmlFor='doYouKnowAuditive'>¿Conoce Ud. Algún Aparato Auditivo?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='doYouKnowAuditive'
                                    name='doYouKnowAuditive'
                                    ref={doYouKnowAuditiveInput}
                                    value={data2.doYouKnowAuditive}
                                    onChange={(e) => setData2('doYouKnowAuditive', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.doYouKnowAuditive}></InputError>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='whatDoYouThink'>¿Qué opinión tiene al respecto?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='whatDoYouThink'
                                    name='whatDoYouThink'
                                    ref={whatDoYouThinkInput}
                                    value={data2.whatDoYouThink}
                                    onChange={(e) => setData2('whatDoYouThink', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.whatDoYouThink}></InputError>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='whatDoYouExpect'>¿Qué espera Ud. de un aparato auditivo?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='whatDoYouExpect'
                                    name='whatDoYouExpect'
                                    ref={whatDoYouExpectInput}
                                    value={data2.whatDoYouExpect}
                                    onChange={(e) => setData2('whatDoYouExpect', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.whatDoYouExpect}></InputError>

                                <InputLabel className='text-gray-600 mt-3' htmlFor='whatAreYouInterest'>¿Hay algún tipo de aparato por el que Ud. se interese en particular?</InputLabel>
                                <TextInput
                                    className='w-full mb-4'
                                    disabled={enable}
                                    id='whatAreYouInterest'
                                    name='whatAreYouInterest'
                                    ref={whatAreYouInterestInput}
                                    value={data2.whatAreYouInterest}
                                    onChange={(e) => setData2('whatAreYouInterest', e.target.value)}>
                                </TextInput>
                                <InputError message={errors2.whatAreYouInterest}></InputError>
                            </form>


                        </TabPanel>

                        <TabPanel className='ml-4'>
                            <Tabs>
                                <TabList className="flex mb-2 text-white">
                                    <Tab className="py-2 px-7 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md bg-color2" selectedClassName="bg-color3">
                                        Audiometrías
                                    </Tab>
                                    <Tab className="py-2 px-7 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md bg-color2" selectedClassName="bg-color3">
                                        Logoaudiometría
                                    </Tab>
                                    <Tab className="py-2 px-7 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md bg-color2" selectedClassName="bg-color3">
                                        Prueba de toleracia
                                    </Tab>
                                    <Tab className="py-2 px-7 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md bg-color2" selectedClassName="bg-color3">
                                        Auscultación
                                    </Tab>
                                </TabList>
                                <TabPanel>
                                    Audiometria ss
                                </TabPanel>
                                <TabPanel></TabPanel>
                                <TabPanel></TabPanel>
                                <TabPanel></TabPanel>
                            </Tabs>
                        </TabPanel>

                        <TabPanel className='ml-4'>
                            <div className='p-6'>
                                <h2 className="text-xl font-bold mb-4">Contenido del Tab 3</h2>
                                <p>Aquí va la información del Tab 3.</p>
                            </div>
                        </TabPanel>

                        <TabPanel className=''>
                            <div className='p-6'>
                                <h3 className="text-xl font-bold mb-4">Productos del paciente</h3>
                                <table className="w-full min-w-max">
                                    <thead>
                                        <tr>
                                            <th className="p-4 text-[15px] bg-color2 text-white border">
                                                <div className='flex justify-between'>
                                                    <span>Número de serie</span>
                                                </div>
                                            </th>
                                            <th className="p-4 text-[15px] bg-color2 text-white border" >
                                                <div className='flex justify-between'>
                                                    <span>Marca</span>
                                                </div>
                                            </th>
                                            <th className="p-4 text-[15px] bg-color2 text-white border">
                                                <div className='flex justify-between'>
                                                    <span>Modelo</span>
                                                </div>
                                            </th>
                                            <th className="p-4 text-[15px] bg-color2 text-white border">Accciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.map((sale, index) => (
                                            <tr key={sale.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                                <td className="p-4 border">{sale.product.serial_number}</td>
                                                <td className="p-4 border">{sale.product.branch}</td>
                                                <td className="p-4 border">{sale.product.model}</td>
                                                <td className='p-4 border'>
                                                    <div className="flex justify-center">
                                                        <ButtonSecondary><RiEyeFill /></ButtonSecondary>
                                                        {/* <ButtonEdit onClick={(e) => { openModal(2, branch.id, branch.name, branch.address, branch.image) }}><RiEditBoxFill /></ButtonEdit>
                                                        <ButtonDelete onClick={(e) => { openDeleteModal(branch.id, branch.name) }}><RiDeleteBin5Fill /></ButtonDelete> */}
                                                    </div>
                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>


                            </div>
                        </TabPanel>

                        <TabPanel>
                        <div className='p-6'>
                                <h3 className="text-xl font-bold mb-4">Garantías del paciente</h3>
                                <table className="w-full min-w-max">
                                    <thead>
                                        <tr>
                                            <th className="p-4 text-[15px] bg-color2 text-white border">
                                                <div className='flex justify-between'>
                                                    <span>Número de serie</span>
                                                </div>
                                            </th>
                                            <th className="p-4 text-[15px] bg-color2 text-white border" >
                                                <div className='flex justify-between'>
                                                    <span>Marca</span>
                                                </div>
                                            </th>
                                            <th className="p-4 text-[15px] bg-color2 text-white border">
                                                <div className='flex justify-between'>
                                                    <span>Modelo</span>
                                                </div>
                                            </th>
                                            <th className="p-4 text-[15px] bg-color2 text-white border">Accciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.map((sale, index) => (
                                            <tr key={sale.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                                <td className="p-4 border">{sale.product.serial_number}</td>
                                                <td className="p-4 border">{sale.product.branch}</td>
                                                <td className="p-4 border">{sale.product.model}</td>
                                                <td className='p-4 border'>
                                                    <div className="flex justify-center">
                                                        <ButtonSecondary><RiEyeFill /></ButtonSecondary>
                                                        {/* <ButtonEdit onClick={(e) => { openModal(2, branch.id, branch.name, branch.address, branch.image) }}><RiEditBoxFill /></ButtonEdit>
                                                        <ButtonDelete onClick={(e) => { openDeleteModal(branch.id, branch.name) }}><RiDeleteBin5Fill /></ButtonDelete> */}
                                                    </div>
                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>


                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </DashboardLayout>

            <Dialog open={modal} onClose={closeModal} maxWidth="md" fullWidth>
                <form onSubmit={save} className="p-6" encType="multipart/form-data" method="POST">
                    <DialogTitle className="">
                        <span className="text-2xl text-color1 font-bold">{title}</span>
                    </DialogTitle>
                    <DialogContent>
                        <InputLabel className='text-gray-600' htmlFor='name'>Nombre:</InputLabel>
                        <TextInput className='w-full mb-4' id='name' name='name' ref={nameInput} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.name}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='address'>Dirección:</InputLabel>
                        <TextInput className='w-full mb-4' id='address' name='address' ref={addressInput} value={data.address} required='required' onChange={(e) => setData('address', e.target.value)}></TextInput>
                        <InputError message={errors.address}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='email'>Email:</InputLabel>
                        <TextInput className='w-full mb-4' id='email' name='email' ref={emailInput} value={data.email} required='required' onChange={(e) => setData('email', e.target.value)}></TextInput>
                        <InputError message={errors.email}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='phone'>Teléfono:</InputLabel>
                        <TextInput className='w-full mb-4' id='phone' name='phone' ref={phoneInput} value={data.phone} required='required' onChange={(e) => setData('phone', e.target.value)}></TextInput>
                        <InputError message={errors.phone}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='age'>Edad:</InputLabel>
                        <TextInput className='w-full mb-4' id='age' type='number' name='age' ref={ageInput} value={data.age} required='required' onChange={(e) => setData('age', e.target.value)}></TextInput>
                        <InputError message={errors.age}></InputError>

                        <InputLabel htmlFor='gender'>Género:</InputLabel>
                        <Select
                            className="w-full mb-4"
                            id='gender'
                            ref={genderInput}
                            value={data.gender || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("gender", e.target.value)}
                        >
                            <MenuItem value={'Masculino'}>
                                Masculino
                            </MenuItem>
                            <MenuItem value={'Femenino'}>
                                Femenino
                            </MenuItem>
                        </Select>

                        <InputLabel className='text-gray-600' htmlFor='publicity_method'>Método publicitario:</InputLabel>
                        <TextInput className='w-full mb-4' id='publicity_method' name='publicity_method' ref={publicity_methodInput} value={data.publicity_method} required='required' onChange={(e) => setData('publicity_method', e.target.value)}></TextInput>
                        <InputError message={errors.publicity_method}></InputError>

                        <InputLabel htmlFor='ailments'>Padecimientos:</InputLabel>
                        <TextField multiline className="w-full mb-4" rows={6} id="ailments" name="ailments" ref={ailmentsInput} value={data.ailments || ''} onChange={(e) => setData('ailments', e.target.value)} />
                        <InputError message={errors.ailments}></InputError>

                        <InputLabel htmlFor='background'>Antecedentes:</InputLabel>
                        <TextField multiline className="w-full mb-4" rows={6} id="background" name="background" ref={backgroundInput} value={data.background || ''} onChange={(e) => setData('background', e.target.value)} />
                        <InputError message={errors.background}></InputError>

                    </DialogContent>
                    <DialogActions>
                        <div className="flex justify-end items-center mt-4">
                            <ButtonCancel type='button' onClick={closeModal} disabled={processing}>Cancelar</ButtonCancel>
                            <ButtonPrimary className="ml-3" disabled={processing}>Enviar</ButtonPrimary>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={deleteModal} onClose={closeDeleteModal}>
                <DialogTitle>¿Estás seguro de que deseas eliminar este paciente?</DialogTitle>
                <DialogContent>
                    <p>El paciente <strong>{data.name}</strong> será eliminado.</p>
                </DialogContent>
                <DialogActions>
                    <ButtonCancel onClick={closeDeleteModal}>Cancelar</ButtonCancel>
                    <ButtonDelete onClick={borrar}>Eliminar</ButtonDelete>
                </DialogActions>
            </Dialog>
            <Head title="Pacientes" />
        </>
    );
}
