import ButtonSecondary from "@/Components/ButtonSecondary";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { RiSortAlphabetAsc } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import ButtonCancel from "@/Components/ButtonCancel";
import ButtonPrimary from "@/Components/ButtonPrimary";

export default function ProductIndex (props) {
    const { products, auth, toast: toastProp, url } = usePage().props;

    const getCssVariable = (variable) => {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    };

    // ---------------------------------------------------------------------------------------
    // SORTED FUNCTIONS ----------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------

    const [sortedProducts, setSortedProducts] = useState(products);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchQuery, setSearchQuery] = useState('');

    const sortProducts = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sorted = [...sortedProducts].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setSortedProducts(sorted);
        setSortConfig({ key, direction });
    };

    const getColumnClass = (key) => {
        if (sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? 'ascending' : 'descending';
    };

    // ---------------------------------------------------------------------------------------
    // SEARCH FUNCTION -----------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query)
        );

        setSortedProducts(filteredProducts);
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

    // const nameInput = useRef();

    const brandInput = useRef();
    const modelInput = useRef();
    const serial_numberInput = useRef();
    const pilaInput = useRef();
    const priceInput = useRef();

    const { data, setData, delete: destroy, post, get, put, processing, progress, errors, reset } = useForm({
        id: '',
        brand: '',
        model:'',
        serial_number: '',
        pila: '',
        price: '',
    });

    //MODAL
    const openModal = (op, id, brand,model,serial_number,pila,price) => {
        setModal(true);
        setOperation(op);
        setData({
            id: '',
            brand: '',
            model:'',
            serial_number: '',
            pila: '',
            price: '',
        })
        if (op === 1) {
            setTitle('Crear producto');
        } else {
            setTitle('Editar producto');
            setData({
                id: id,
                brand: brand,
                model:model,
                serial_number: serial_number,
                pila: pila,
                price: price,
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
            post(route('product.store'), {
                onSuccess: () => { ok('Producto creado con éxito') },
            });
        } else {
            post(route('product.update', data.id), {
                onSuccess: () => { ok('Producto editado con éxito') },
            });
        }
    }

    const ok = (message) => {
        reset();
        closeModal();
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: getCssVariable('--color1') })
    };

    return (
        <>
            <ToastContainer />
            <DashboardLayout user={auth.user} title={'Listando productos'}>
            <div className='flex justify-between my-2'>
                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="border p-1 rounded border-gray-400 px-5"
                    />
                    <ButtonSecondary onClick={() => openModal(1)}>Crear producto</ButtonSecondary>

                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead>
                            <tr className=''>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortPatients('name')}>
                                    <div className='flex justify-between'>
                                        <span>Número de serie</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortPatients('address')}>
                                    <div className='flex justify-between'>
                                        <span>Marca</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortPatients('phone')}>
                                    <div className='flex justify-between'>
                                        <span>Modelo</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortPatients('email')}>
                                    <div className='flex justify-between'>
                                        <span>Precio</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProducts.map((product, index) => (
                                <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    <td className="p-4 border">{product.name}</td>
                                    <td className="p-4 border">{product.address}</td>
                                    <td className="p-4 border">{product.phone}</td>
                                    <td className="p-4 border">{product.email}</td>
                                    <td className="p-4 border">
                                        <div className='flex justify-center'>
                                            <ButtonSecondary onClick={()=>handleShowProduct(product.id)}><RiEyeFill /></ButtonSecondary>
                                            <ButtonEdit onClick={() => openModal(2, product.id, patient.user_id, patient.name, patient.address, patient.phone, patient.age, patient.gender, patient.publicity_method, patient.ailments, patient.background, patient.email)}><RiEditBoxFill /> </ButtonEdit>
                                            <ButtonDelete onClick={() => openDeleteModal(product.id, patient.name)}><RiDeleteBin5Fill/> </ButtonDelete>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardLayout>

            <Dialog open={modal} onClose={closeModal} maxWidth="md" fullWidth>
                <form onSubmit={save} className="p-6" encType="multipart/form-data" method="POST">
                    <DialogTitle className="">
                        <span className="text-2xl text-color1 font-bold">{title}</span>
                    </DialogTitle>
                    <DialogContent>
                        <InputLabel className='text-gray-600' htmlFor='serial_number' value=' '>Número de serie:</InputLabel>
                        <TextInput className='w-full mb-4' id='serial_number' name='serial_number' ref={serial_numberInput} value={data.serial_number} required='required' onChange={(e) => setData('serial_number', e.target.value)}></TextInput>
                        <InputError message={errors.serial_number}></InputError>

                        {/* <InputLabel className='text-gray-600' htmlFor='address' value=''>Dirección:</InputLabel>
                        <TextInput className='w-full mb-4' id='address' name='address' ref={addressInput} value={data.address} required='required' onChange={(e) => setData('address', e.target.value)}></TextInput>
                        <InputError message={errors.address}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='email' value=' '>Email:</InputLabel>
                        <TextInput className='w-full mb-4' id='email' name='email' ref={emailInput} value={data.email} required='required' onChange={(e) => setData('email', e.target.value)}></TextInput>
                        <InputError message={errors.email}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='phone' value=''>Teléfono:</InputLabel>
                        <TextInput className='w-full mb-4' id='phone' name='phone' ref={phoneInput} value={data.phone} required='required' onChange={(e) => setData('phone', e.target.value)}></TextInput>
                        <InputError message={errors.phone}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='age' value=''>Edad:</InputLabel>
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
                            <MenuItem value={'Masculino'}>
                                Femenino
                            </MenuItem>
                        </Select>

                        <InputLabel className='text-gray-600' htmlFor='publicity_method' value=''>Método publicitario:</InputLabel>
                        <TextInput className='w-full mb-4' id='publicity_method' name='publicity_method' ref={publicity_methodInput} value={data.publicity_method} required='required' onChange={(e) => setData('publicity_method', e.target.value)}></TextInput>
                        <InputError message={errors.publicity_method}></InputError>

                        <InputLabel htmlFor='ailments'>Padecimientos:</InputLabel>
                        <TextField multiline className="w-full mb-4" rows={6} id="ailments" name="ailments" ref={ailmentsInput} value={data.ailments || ''} onChange={(e) => setData('ailments', e.target.value)} />
                        <InputError message={errors.ailments}></InputError>

                        <InputLabel htmlFor='background'>Antecedentes:</InputLabel>
                        <TextField multiline className="w-full mb-4" rows={6} id="background" name="background" ref={backgroundInput} value={data.background || ''} onChange={(e) => setData('background', e.target.value)} />
                        <InputError message={errors.background}></InputError> */}

                    </DialogContent>
                    <DialogActions>
                        <div className="flex justify-end items-center mt-4">
                            <ButtonCancel type='button' onClick={closeModal} disabled={processing}>Cancelar</ButtonCancel>
                            <ButtonPrimary className="ml-3" disabled={processing}>Enviar</ButtonPrimary>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
