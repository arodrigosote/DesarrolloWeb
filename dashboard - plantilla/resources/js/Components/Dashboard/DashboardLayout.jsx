import Sidebar from "@/Components/Sidebar/Sidebar";

export default function DashboardLayout({auth, children, title }) {
    return(
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-11">

            <Sidebar auth={auth}></Sidebar>

            {/* content */}
            <div className="col-span-9 bg-slate-100">
                {/* <DashboardHeader auth={auth}></DashboardHeader> */}
                <div className="bg-white p-16 w-[85%] mx-auto mt-8 shadow-md ">
                    <h2 className="text-primary font-bold text-2xl ">{title}</h2>
                </div>
                <div className="px-16 py-8 bg-white mx-auto w-[85%] mt-8 mb-8 shadow-md ">{children}</div>
            </div>

        </div>
    )
}
