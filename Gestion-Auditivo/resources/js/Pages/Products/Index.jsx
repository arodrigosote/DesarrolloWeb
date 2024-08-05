import ButtonSecondary from "@/Components/ButtonSecondary";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { usePage } from "@inertiajs/react";
import { RiSortAlphabetAsc } from "react-icons/ri";
import { ToastContainer } from "react-toastify";

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
            setTitle('Crear producto');
        } else {
            setTitle('Editar producto');
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
            post(route('product.store'), {
                onSuccess: () => { ok('Paciente creado con éxito') },
            });
        } else {
            post(route('product.update', data.id), {
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
        </>
    )
}
