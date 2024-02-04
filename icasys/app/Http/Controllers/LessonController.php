<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class LessonController extends Controller
{
    public function store(Request $request)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $lesson = Lesson::create([
                'module_id' => $request->module_id,
                'lesson_number' => $request->lesson_number,
                'name' => $request->name,
                'content' => $request->content,
                'content_houres' => $request->content_houres,
                'content_minutes' => $request->content_minutes,
                'resources_url' => $request->resources_url,
            ]);

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $rutaDestino = 'images/courses/lessons/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $lesson->image = $rutaDestino . $nombreArchivo;
            }

            if ($request->hasFile('video')) {
                $file = $request->file('video');
                $rutaDestino = 'videos/courses/lessons/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $lesson->video = $rutaDestino . $nombreArchivo;
            }
            $lesson->save();
        }
    }

    public function update(Request $request, $id)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $lesson = Lesson::find($id);
            $rutaRelativaImagen = $lesson->imagenDestacada;
            // Ruta relativa al archivo en la carpeta storage
            $rutaRelativaVideo = $lesson->urlVideoLeccion;

            request()->validate(Clase::$rules);

            $lesson->update($request->all());

            if ($request->hasFile('image')) {
                // Construye la ruta completa al archivo en la carpeta storage
                $rutaCompletaStorage = storage_path('app/public/' . $rutaRelativaImagen);
                // Verifica si el archivo existe
                if (File::exists($rutaCompletaStorage)) {
                    // Elimina el archivo
                    File::delete($rutaCompletaStorage);
                }

                $file = $request->file('image');
                $rutaDestino = 'images/courses/lessons/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $lesson->image= $rutaDestino . $nombreArchivo;
            }

            if ($request->hasFile('video')) {
                // Construye la ruta completa al archivo en la carpeta storage
                $rutaCompletaStorage = storage_path('app/public/' . $rutaRelativaVideo);
                // Verifica si el archivo existe
                if (File::exists($rutaCompletaStorage)) {
                    // Elimina el archivo
                    File::delete($rutaCompletaStorage);
                }

                $video = $request->file('video');
                $rutaDestino = 'videos/courses/' . $lesson->module->course->slug . '/';
                $nombreArchivo = time() . '-' . $video->getClientOriginalName();
                $moverArchivo = $video->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $lesson->video= $rutaDestino . $nombreArchivo;
                // Obtener la ruta completa del archivo
                $rutaCompleta = storage_path('app/public/' . $lesson->video);

                // Establecer los permisos a 640
                chmod($rutaCompleta, 0641);


            }

            $lesson->save();
        }
    }
}
