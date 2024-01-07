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
        $hour = Hour::create($request->all());
        $hours = Hour::all();
        return Inertia::render("Dashboard/Admin/Hour/Index", compact("hours"));
    }

    public function show($id){
        $hour = Hours::findOrFail($id);
        return Inertia::render("Dashboard/Admin/Hour/Show", compact("hour"));
    }
    public function update(Request $request, $id){
        $hour = Hour::findOrFail($id);
        $hour->update($request->all());
    }
    public function destroy($id){
        $hour = Hour::findOrFail($id);
        $hour->delete();
    }

}
