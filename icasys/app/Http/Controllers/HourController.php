<?php

namespace App\Http\Controllers;

use App\Models\Hour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HourController extends Controller
{
    //
    public function index(){
        $hours = Hour::all();
        return Inertia::render("Dashboard/Admin/Hour/Index", compact("hours"));
    }

    public function store(Request $request){
    }

    public function show($id){}
    public function edit($id){}
    public function update(Request $request, $id){}
    public function destroy($id){}

}
