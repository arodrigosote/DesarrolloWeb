import ButtonSecondary from "@/Components/ButtonSecondary";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { RiDeleteBin5Fill, RiEditBoxFill, RiEyeFill, RiSortAlphabetAsc } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import ButtonCancel from "@/Components/ButtonCancel";
import ButtonPrimary from "@/Components/ButtonPrimary";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonDelete from "@/Components/ButtonDelete";
import Swal from "sweetalert2";

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
            product.serial_number.toLowerCase().includes(query)
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
    const openModal = (op, id, brand,model,serial_number,price,pila) => {
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
        get(route('product.index'));
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
        destroy(route('product.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Producto eliminado con éxito.') },
        });
    }

    return (
        <>
            <ToastContainer />
            <DashboardLayout user={auth.user} title={'Listando productos'}>
            <div className='flex justify-between my-2'>
                    <input
                        type="text"
                        placeholder="Buscar por número de serie"
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
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortProducts('serial_number')}>
                                    <div className='flex justify-between'>
                                        <span>Número de serie</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortProducts('brand')}>
                                    <div className='flex justify-between'>
                                        <span>Marca</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortProducts('model')}>
                                    <div className='flex justify-between'>
                                        <span>Modelo</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortProducts('price')}>
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
                                    <td className="p-4 border">{product.serial_number}</td>
                                    <td className="p-4 border">{product.brand}</td>
                                    <td className="p-4 border">{product.model}</td>
                                    <td className="p-4 border">{product.price}</td>
                                    <td className="p-4 border">
                                        <div className='flex justify-center'>
                                            {/* <ButtonSecondary onClick={()=>handleShowProduct(product.id)}><RiEyeFill /></ButtonSecondary> */}
                                            <ButtonEdit onClick={() => openModal(2, product.id, product.brand, product.model, product.serial_number, product.price)}><RiEditBoxFill /> </ButtonEdit>
                                            <ButtonDelete onClick={() => openDeleteModal(product.id, `${product.brand} ${product.model}`)}><RiDeleteBin5Fill/> </ButtonDelete>
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

                        <InputLabel className='text-gray-600' htmlFor='brand' value=''>Marca:</InputLabel>
                        <TextInput className='w-full mb-4' id='brand' name='brand' ref={brandInput} value={data.brand} required='required' onChange={(e) => setData('brand', e.target.value)}></TextInput>
                        <InputError message={errors.brand}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='model' value=' '>Modelo:</InputLabel>
                        <TextInput className='w-full mb-4' id='model' name='model' ref={modelInput} value={data.model} required='required' onChange={(e) => setData('model', e.target.value)}></TextInput>
                        <InputError message={errors.model}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='price' value=''>Precio:</InputLabel>
                        <TextInput className='w-full mb-4' id='price' type='number' onWheel={(e) => e.target.blur()} name='price' ref={priceInput} value={data.price} required='required' onChange={(e) => setData('price', e.target.value)}></TextInput>
                        <InputError message={errors.price}></InputError>

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
                <DialogTitle>¿Estás seguro de que deseas eliminar este producto?</DialogTitle>
                <DialogContent>
                    <p>El producto <strong>{data.name}</strong> será eliminado.</p>
                </DialogContent>
                <DialogActions>
                    <ButtonCancel onClick={closeDeleteModal}>Cancelar</ButtonCancel>
                    <ButtonDelete onClick={borrar} disabled={processing}>Eliminar</ButtonDelete>
                </DialogActions>
            </Dialog>
            <Head title="Productos" />
        </>
    )
}
