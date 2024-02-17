<?php

namespace App\Http\Controllers;

use App\Models\Day;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class DayController extends Controller
{
    //
    public function index()
    {
        if (Gate::denies('isAdmin')) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No tienes permiso para ver esta página.',
                'tipo' => 'error',
            ]);
        } else {
            return Inertia::render("Dashboard/Admin/Day/Index", [
                "days" => Day::all(),
                'shared' => [
                    'user' => auth()->user()->name,
                ],
            ]);
        }

    }

    public function index_after_deleting()
    {
        if (Gate::denies('isAdmin')) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $days = Day::all();
            return Inertia::render("Dashboard/Admin/Day/Index", compact("days"))->with("success", "Operacion exitosa");
        }

    }

    public function show($dayId)
    {
        if (Gate::denies('isAdmin')) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $day = Day::find($dayId);
            return Inertia::render("Dashboard/Admin/Day/Show", compact("day"));
        }

    }

    public function store(Request $request)
    {
        if (Gate::denies('isAdmin')) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $day = Day::create($request->all());
            $days = Day::all();
            return Inertia::render("Dashboard/Admin/Day/Index", compact("days"))->with("success", "Operacion exitosa");
        }
    }

    public function edit($dayID)
    {

        if (Gate::denies('isAdmin')) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $day = Day::find($dayID);
            return Inertia::render("Dashboard/Admin/Day/Edit", [
                'day' => $day,
            ]);
        }
    }

    public function update(Request $request, $dayID)
    {

        if (Gate::denies('isAdmin')) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $day = Day::findOrFail($dayID);
            $day->update($request->all());
        }
    }

    public function destroy(Request $request)
    {
        if (Gate::denies('isAdmin')) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $day = Day::findOrFail($request->id);
            $day->delete();
        }

    }

}
