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

    public function show(Day $day){

    }

    public function create(){
        return Inertia::render("Dashboard/Admin/Day/Create");
    }

    public function store(Request $request){
        $day = Day::create($request->all());
        $days = Day::all();
        return Inertia::render("Dashboard/Admin/Day/Index",compact("days"))->with("success","Operacion exitosa");
    }

    public function edit(Day $day){

    }

    public function update(Request $request, Day $day){

    }

    public function destroy($id){
        $day = Day::find($id);
        $day->delete();
        $days = Day::all();
        return Inertia::render("Dashboard/Admin/Day/Index",compact("days"))->with("success","Operacion exitosa, día eliminado");
    }
}
