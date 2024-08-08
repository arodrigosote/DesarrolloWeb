<?php

namespace App\Http\Controllers;

use App\Models\Audiometry;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class AudiometryController extends Controller
{
    public function store(Request $request){
        if (Gate::allows("isAdmin")) {

            $audiometry = Audiometry::create($request->all());

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $rutaDestino = 'images/audiometries/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $audiometry->image = $rutaDestino . $nombreArchivo;
            } else {
                $audiometry->image = 'images/audiometries/test.png';
            }

            $audiometry->save();


        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }
}
