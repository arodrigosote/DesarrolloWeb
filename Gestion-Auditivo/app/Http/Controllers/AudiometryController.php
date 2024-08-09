<?php

namespace App\Http\Controllers;

use App\Models\Audiometry;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\File;

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

            $audiometry->user_id = auth()->user()->id;

            $audiometry->save();


        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }


    public function update(Request $request ,$id)
    {
        if (Gate::allows("isAdmin")) {

            $audiometry = Audiometry::find($id);

            // Ruta relativa al archivo en la carpeta storage
            $rutaRelativaStorage = $audiometry->image;

            dd($audiometry);
            $audiometry->update($request->all());


            if ($request->hasFile('image')) {
                // Construye la ruta completa al archivo en la carpeta storage
                $rutaCompletaStorage2 = storage_path('app/public/' . $rutaRelativaStorage);
                // Verifica si el archivo existe
                if (File::exists($rutaCompletaStorage2)) {
                    // Elimina el archivo
                    File::delete($rutaCompletaStorage2);
                }
                $file = $request->file('image');
                $rutaDestino = 'images/audiometries/';
                $nombreArchivo = time() . '-' . $audiometry->patient->name . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $audiometry->image = $rutaDestino . $nombreArchivo;
            }

            $audiometry->save();

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
            $audiometry = Audiometry::find($id);
            $audiometry->delete();
        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }
}
