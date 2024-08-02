<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        if (Gate::allows("isAdmin")) {
            return Inertia::render('Settings/Employees/Index', [
                'branches' => Branch::all(),
                'employees' => User::with('branch')->get(),
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

                if ($request->password) {
                    $password = bcrypt($request->password);
                } else {
                    $password = 'pass';
                }

                // Crear un nuevo registro en la tabla 'users'
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => $password,
                    'role' => $request->role,
                    'branch_id' => $request->branch_id,
                    'phone' => $request->phone,
                ]);

            } catch (\Throwable $th) {
                return Inertia::render('Settings/Employees/Index', [
                    'branches' => Branch::all(),
                    'employees' => User::with('branch')->get(),
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
                $user = User::findOrFail($id);

                if ($request->password) {
                    $password = bcrypt($request->password);
                    $user->update([
                        'name' => $request->name,
                        'email' => $request->email,
                        'password' => $password,
                        'role' => $request->role,
                        'branch_id' => $request->branch_id,
                        'phone' => $request->phone,
                    ]);
                } else {
                    $user->update([
                        'name' => $request->name,
                        'email' => $request->email,
                        'role' => $request->role,
                        'branch_id' => $request->branch_id,
                        'phone' => $request->phone,
                    ]);
                }


            } catch (\Throwable $th) {
                return Inertia::render('Settings/Employees/Index', [
                    'branches' => Branch::all(),
                    'employees' => User::with('branch')->get(),
                ])->with('toast', [
                            'mensaje' => 'Ocurrió un erro al momento de actualizar el empleado. Contacte a soporte',
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

    public function destroy($id)
    {
        if (Gate::allows("isAdmin")) {
            try {
                $user = auth()->user();
                if ($user->id == $id) {
                    return Inertia::render('Settings/Employees/Index', [
                        'branches' => Branch::all(),
                        'employees' => User::with('branch')->get(),
                    ])->with('toast', [
                                'mensaje' => 'No se puede eliminar a sí mismo del sistema',
                                'tipo' => 'error',
                            ]);
                } else {
                    $employee = User::findOrFail($id);
                    $employee->delete();
                }

            } catch (\Throwable $th) {
                return Inertia::render('Settings/Employees/Index', [
                    'branches' => Branch::all(),
                    'employees' => User::with('branch')->get(),
                ])->with('toast', [
                            'mensaje' => 'Ocurrió un erro al momento de eliminar el empleado. Contacte a soporte',
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

    public function show($id)
    {
        if (Gate::allows("isAdmin")) {
            try {
                return Inertia::render('Settings/Employees/Show', [
                    'patient' => Patient::findOrFail($id),
                ]);
            } catch (\Throwable $th) {
                return Inertia::render("Settings/Employees/Index", [
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
