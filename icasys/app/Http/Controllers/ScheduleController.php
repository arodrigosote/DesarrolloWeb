<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    //
    public function index(){
        $schedules = Schedule::all();
        return Inertia::render("Dashboard/Admin/Schedule/Index", compact("schedules"));
    }
    public function store(Request $request){

    }
    public function show($id){

    }
    public function edit($id){

    }
    public function update(Request $request, $id){

    }
    public function destroy($id){

    }
}
