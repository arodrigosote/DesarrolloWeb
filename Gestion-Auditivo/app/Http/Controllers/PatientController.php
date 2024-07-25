<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\File;

class PatientController extends Controller
{
    public function index()
    {
        if (Gate::allows("isAdmin")) {
            return Inertia::render('Patients/Index', [
                'patients' => Patient::all(),
            ]);
        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function store(Request $request)
    {
        if (Gate::allows("isAdmin")) {
            try {
                $patient = Patient::create($request->all());
            } catch (\Throwable $th) {
                return Inertia::render("Patients/Index", [
                    'patients' => Patient::all(),
                    'url' => env('APP_URL'),
                ])->with('toast', [
                            'mensaje' => 'Ocurrió un erro al momento de crear paciente.',
                            'tipo' => 'error',
                        ]);
            }
        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        if (Gate::allows("isAdmin")) {
            return Inertia::render('Patients/Index', [
                'patients' => Patient::all(),
            ]);
        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function destroy()
    {
        if (Gate::allows("isAdmin")) {
            return Inertia::render('Patients/Index', [
                'patients' => Patient::all(),
            ]);
        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function show($id)
    {
        if (Gate::allows("isAdmin")) {
            try {
                return Inertia::render('Patients/Show', [
                    'patient' => Patient::findOrFail($id),
                ]);
            } catch (\Throwable $th) {
                return Inertia::render("Patients/Index", [
                    'patients' => Patient::all(),
                    'url' => env('APP_URL'),
                ])->with('toast', [
                            'mensaje' => 'Ocurrió un erro al momento de mostrar al paciente.',
                            'tipo' => 'error',
                        ]);
            }
        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }
}
