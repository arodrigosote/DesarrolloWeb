<?php

namespace App\Http\Controllers;

use App\Models\Day;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DayController extends Controller
{
    //
    public function index()
    {
        $days = Day::all();
        return Inertia::render("Dashboard/Admin/Day/Index", compact("days"));
    }

    public function index_after_deleting(){
        $days = Day::all();
        return Inertia::render("Dashboard/Admin/Day/Index", compact("days"))->with("success", "Operacion exitosa");
    }

    public function show($dayId)
    {
        $day = Day::find($dayId);
        return Inertia::render("Dashboard/Admin/Day/Show", compact("day"));
    }

    public function create()
    {
        return Inertia::render("Dashboard/Admin/Day/Create");
    }

    public function store(Request $request)
    {
        $day = Day::create($request->all());
        $days = Day::all();
        return Inertia::render("Dashboard/Admin/Day/Index", compact("days"))->with("success", "Operacion exitosa");
    }

    public function edit($dayID)
    {
        $day = Day::find($dayID);
        return Inertia::render("Dashboard/Admin/Day/Edit", [
            'day' => $day,
        ]);
    }

    public function update(Request $request, $dayID)
    {
        $day = Day::findOrFail($dayID);
        $day->update($request->all());
    }

    public function destroy($id)
    {
        $day = Day::findOrFail($id);

        $day->delete();


    }

}
