<?php

namespace App\Http\Controllers;

use App\Models\Day;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DayController extends Controller
{
    //
    public function index(){
        $days = Day::all();
        return Inertia::render("Dashboard/Admin/Day/Index",compact("days"));
    }

    public function create(){
        return Inertia::render("Dashboard/Admin/Day/Create");
    }
}
