<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        if (Gate::allows("isAdmin")) {
            return Inertia::render('Products/Index', [
                'products' => Product::all(),
            ]);
        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function store(Request $request){
        if (Gate::allows("isAdmin")) {
            try {
                $user = auth()->user();

                $product = Product::create($request->all());
                $product->branch_id = $user->branch_id;
                $product->save();

            } catch (\Throwable $th) {
                return Inertia::render("Products/Index", [
                    'products' => Product::all(),
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

    public function update(Request $request, $id){
        if (Gate::allows("isAdmin")) {
            try {
                $product = Product::findOrFail($id);
                // Ruta relativa al archivo en la carpeta storage

                $product->update($request->all());


            } catch (\Throwable $th) {
                return Inertia::render('Products/Index', [
                    'products' => Product::all(),
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


    public function destroy($id)
    {
        if (Gate::allows("isAdmin")) {
            $product = Product::findOrFail($id);
            $product->delete();
        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }
}
