<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

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
}
