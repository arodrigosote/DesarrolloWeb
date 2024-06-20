<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Module;
use App\Models\Pucharse;
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

            if ($request->isPractice == false) {
                $lesson->isPractice = false;
            } elseif ($request->isPractice == true) {
                $lesson->isPractice = true;
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
            $rutaRelativaImagen = $lesson->image;
            // Ruta relativa al archivo en la carpeta storage
            $rutaRelativaVideo = $lesson->video;

            // request()->validate(Lesson::$rules);

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
                chmod($rutaCompleta, 0644);


            }
            if ($request->isPractice == false) {
                $lesson->isPractice = false;
            } elseif ($request->isPractice == true) {
                $lesson->isPractice = true;
            }

            $lesson->save();
        }
    }

    public function delete($id)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $lesson = Lesson::find($id);

            // Ruta relativa al archivo en la carpeta storage
            $rutaRelativaImagen = $lesson->imagen;
            // Ruta relativa al archivo en la carpeta storage
            $rutaRelativaVideo = $lesson->video;

            // Construye la ruta completa al archivo en la carpeta storage
            $rutaCompletaStorage = storage_path('app/public/' . $rutaRelativaVideo);
            // Verifica si el archivo existe
            if (File::exists($rutaCompletaStorage)) {
                // Elimina el archivo
                File::delete($rutaCompletaStorage);
            }

            // Construye la ruta completa al archivo en la carpeta storage
            $rutaCompletaStorage = storage_path('app/public/' . $rutaRelativaImagen);
            // Verifica si el archivo existe
            if (File::exists($rutaCompletaStorage)) {
                // Elimina el archivo
                File::delete($rutaCompletaStorage);
            }

            $lesson->delete();
        }
    }

    public function show($lesson_id, $lesson_name, $course_name){
        return Inertia::render('Dashboard/Admin/Course/Lesson/Show', [
            'lesson' => Lesson::find($lesson_id),
        ]);
    }

    public function show_lesson($course_id, $course_title, $lesson_id, $lesson_number, $lesson_name){
        $user = auth()->user();
        $pucharse = Pucharse::where('course_id',$course_id)->where('user_id',$user->id)->where('state', 'payed')->first();

        if($pucharse){
            return Inertia::render('Dashboard/Admin/Course/Lesson/ShowLesson', [
                'course' => Course::with('coursecategory', 'professor', 'coursedifficulty')->find($course_id),
                'modules' => Module::where('course_id', $course_id)->get(),
                'lessons' => Lesson::whereHas('module', function ($query) use ($course_id) {
                    $query->where('course_id', $course_id);
                })->get(),
                'lesson' => Lesson::find($lesson_id),
                'url' => env('APP_URL'),
            ]);
        }else{
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No puedes acceder al curso.',
                'tipo' => 'error',
            ]);
        }


    }

    public function show_lesson_updated($course_id, $course_title){
        $user = auth()->user();
        $pucharse = Pucharse::where('course_id',$course_id)->where('user_id',$user->id)->where('state', 'payed')->first();

        if($pucharse){
            return Inertia::render('Dashboard/Admin/Course/Lesson/ShowLessonUpdated', [
                'course' => Course::with('coursecategory', 'professor', 'coursedifficulty')->find($course_id),
                'modules' => Module::where('course_id', $course_id)->get(),
                'lessons' => Lesson::whereHas('module', function ($query) use ($course_id) {
                    $query->where('course_id', $course_id);
                })->get(),
                'lesson' => Lesson::whereHas('module', function ($query) use ($course_id) {
                    $query->where('course_id', $course_id);
                })->first(),
                'url' => env('APP_URL'),
            ]);
        }else{
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No puedes acceder al curso.',
                'tipo' => 'error',
            ]);
        }
    }
}
