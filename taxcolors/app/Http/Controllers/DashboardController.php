<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    //Verify if user has logged using this contructor.
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(){
        return view("main_pages.dashboard");
    }
}
