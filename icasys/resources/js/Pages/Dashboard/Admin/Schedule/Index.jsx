import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import React, {useState, useForm} from "react";

const Schedule = () => {
    return(
        <h1>Horarios workks</h1>
    )
}

Schedule.layout = page => <DashboardLayout children={page} title={'Mostrando horarios en sistema'}></DashboardLayout>

export default Schedule;
