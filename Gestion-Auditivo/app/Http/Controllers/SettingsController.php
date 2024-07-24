<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\File;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Settings/Index');
    }


    // ------------------------------------------------------------------------------------
    // BRANCHES FUNCTIONS -----------------------------------------------------------------
    // ------------------------------------------------------------------------------------
    public function index_branches()
    {
        if (Gate::allows("isAdmin")) {
            return Inertia::render('Settings/Branches/Index', [
                'branches' => Branch::all(),
                'url' => env('APP_URL'),
            ]);
        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }
    public function store_branches(Request $request)
    {
        if (Gate::allows("isAdmin")) {

            try {
                $branch = Branch::create([
                    'name' => $request->name,
                    'address' => $request->address,
                    'image' => $request->image,
                ]);
                if ($request->hasFile('logo')) {
                    $file = $request->file('logo');
                    $rutaDestino = 'images/branches/';
                    $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                    $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                    $branch->logo = $rutaDestino . $nombreArchivo;
                }
                $branch->save();

            } catch (\Throwable $th) {
                return Inertia::render("Settings/Branches/Index", [
                    'branches' => Branch::all(),
                    'url' => env('APP_URL'),
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

    public function update_branches(Request $request, $id)
    {
        if (Gate::allows("isAdmin")) {
            try {
                $branch = Branch::findOrFail($id);
                // Ruta relativa al archivo en la carpeta storage
                $rutaRelativaStorage = $branch->logo;


                $branch->update([
                    'name' => $request->name,
                    'address' => $request->address,
                ]);

                if ($request->hasFile('logo')) {
                    // Construye la ruta completa al archivo en la carpeta storage
                    $rutaCompletaStorage = storage_path('app/public/' . $rutaRelativaStorage);
                    // Verifica si el archivo existe
                    if (File::exists($rutaCompletaStorage)) {
                        // Elimina el archivo
                        File::delete($rutaCompletaStorage);
                    }

                    $file = $request->file('logo');
                    $rutaDestino = 'images/branches/';
                    $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                    $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                    $branch->image = $rutaDestino . $nombreArchivo;
                }

                $branch->save();

            } catch (\Throwable $th) {
                return Inertia::render("Settings/Branches/Index", [
                    'branches' => Branch::all(),
                    'url' => env('APP_URL'),
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
    public function destroy_branches($id)
    {
        if (Gate::allows("isAdmin")) {
            try {
                $branch = Branch::findOrFail($id);
                $branch->delete();

            } catch (\Throwable $th) {
                return Inertia::render("Settings/Branches/Index", [
                    'branches' => Branch::all(),
                    'url' => env('APP_URL'),
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

    // ------------------------------------------------------------------------------------
    // EMPLOYEES FUNCTIONS -----------------------------------------------------------------
    // ------------------------------------------------------------------------------------
    public function index_employees()
    {
        return Inertia::render('Settings/Employees/Index');
    }
}
