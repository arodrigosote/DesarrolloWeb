<?php

namespace App\Http\Controllers;

use App\Models\Hour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class HourController extends Controller
{
    //
    public function index()
    {
        if (Gate::denies('isAdmin')) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $hours = Hour::all();
            return Inertia::render("Dashboard/Admin/Hour/Index", compact("hours"));
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
            $hour = Hour::create($request->all());
            $hours = Hour::all();
            return Inertia::render("Dashboard/Admin/Hour/Index", compact("hours"));
        }
    }

    public function show($id)
    {
        if (Gate::denies('isAdmin')) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $hour = Hours::findOrFail($id);
            return Inertia::render("Dashboard/Admin/Hour/Show", compact("hour"));
        }
    }
    public function update(Request $request, $id)
    {
        if (Gate::denies('isAdmin')) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $hour = Hour::findOrFail($id);
            $hour->update($request->all());
        }
    }
    public function destroy($id)
    {
        if (Gate::denies('isAdmin')) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $hour = Hour::findOrFail($id);
            $hour->delete();
        }
    }

}
