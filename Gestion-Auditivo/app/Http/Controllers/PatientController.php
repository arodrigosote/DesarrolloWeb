<?php

namespace App\Http\Controllers;

use App\Models\Fullinfo;
use App\Models\Patient;
use App\Models\Product;
use App\Models\Sale;
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
                $user = auth()->user();

                $patient = Patient::create($request->all());
                $patient->user_id = $user->id;
                $patient->branch_id = $user->branch_id;
                $patient->save();

                $fullinfo = Fullinfo::create();
                $fullinfo->patient_id = $patient->id;
                $fullinfo->save();
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

            try {
                $patient = Patient::findOrFail($id);
                // Ruta relativa al archivo en la carpeta storage

                $patient->update($request->all());


            } catch (\Throwable $th) {
                return Inertia::render('Patients/Index', [
                    'patients' => Patient::all(),
                ])->with('toast', [
                            'mensaje' => 'Ocurrió un erro al momento de crear sucursal.',
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
                    'fullinfo' => Fullinfo::where('patient_id', $id)->first(),
                    'sales' => Sale::where('patient_id',$id)->with('product')->get(),
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

    //-----------------------------------------------------------------------------------
    //FULLINFO --------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    public function update_fulldata(Request $request, $id)
    {
        if (Gate::allows("isAdmin")) {
            try {
                $fullinfo = Fullinfo::findOrFail($id);
                // Ruta relativa al archivo en la carpeta storage
                $fullinfo->update($request->all());
            } catch (\Throwable $th) {
                return Inertia::render('Patients/Index', [
                    'patients' => Patient::all(),
                ])->with('toast', [
                            'mensaje' => 'Ocurrió un erro al momento de actualizar el paciente.',
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
