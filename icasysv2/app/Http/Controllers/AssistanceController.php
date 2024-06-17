<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AssistanceController extends Controller
{
    //

    public function show_assistance_admin(){
        return Inertia::render("Dashboard/Admin/Assistance/Index", []);
    }
}
