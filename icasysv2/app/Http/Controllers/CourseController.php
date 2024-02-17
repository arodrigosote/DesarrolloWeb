<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Coursecategory;
use App\Models\Coursedifficulty;
use App\Models\Lesson;
use App\Models\Module;
use App\Models\Professor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class CourseController extends Controller
{
    //

    public function index()
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            return Inertia::render("Dashboard/Admin/Course/Index", [
                "courses" => Course::with('coursecategory')->get(),
                'difficulties' => Coursedifficulty::all(),
                'professors' => Professor::all(),
                'categories' => Coursecategory::all(),
                'url' => env('APP_URL'),
            ]);
        }
    }

    public function store(Request $request)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $course = Course::create([
                'title' => $request->title,
                'description' => $request->description,
                'short_description' => $request->short_description,
                'slug' => $request->slug,
                'difficulty_id' => $request->difficulty_id,
                'professor_id' => $request->professor_id,
                'category_id' => $request->category_id,
                'price' => $request->price,
                'target_learning' => $request->target_learning,
                'target_audience' => $request->target_audience,
                'houres' => $request->houres,
                // 'files_included' => $request->files_included,
                'requirements' => $request->requirements,
            ]);

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $rutaDestino = 'images/courses/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $course->image = $rutaDestino . $nombreArchivo;
            }

            if ($request->hasFile('video')) {
                $file = $request->file('video');
                $rutaDestino = 'videos/courses/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $course->video = $rutaDestino . $nombreArchivo;
            }
            $course->save();
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
            $course = Course::findOrFail($id);
            // Ruta relativa al archivo en la carpeta storage
            $rutaRelativaStorage = $course->image;
            $videoRelativeStorage = $course->video;

            $course->update([
                'title' => $request->title,
                'description' => $request->description,
                'short_description' => $request->short_description,
                'slug' => $request->slug,
                'difficulty_id' => $request->difficulty_id,
                'professor_id' => $request->professor_id,
                'category_id' => $request->category_id,
                'price' => $request->price,
                'target_learning' => $request->target_learning,
                'target_audience' => $request->target_audience,
                'houres' => $request->houres,
                // 'files_included' => $request->files_included,
                'requirements' => $request->requirements,
            ]);

            if ($request->hasFile('image')) {
                // Construye la ruta completa al archivo en la carpeta storage
                $rutaCompletaStorage = storage_path('app/public/' . $rutaRelativaStorage);
                // Verifica si el archivo existe
                if (File::exists($rutaCompletaStorage)) {
                    // Elimina el archivo
                    File::delete($rutaCompletaStorage);
                }

                $file = $request->file('image');
                $rutaDestino = 'images/courses/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $course->image = $rutaDestino . $nombreArchivo;
            }

            if ($request->hasFile('video')) {
                // Construye la ruta completa al archivo en la carpeta storage
                $rutaCompletaStorage = storage_path('app/public/' . $rutaRelativaStorage);
                // Verifica si el archivo existe
                if (File::exists($rutaCompletaStorage)) {
                    // Elimina el archivo
                    File::delete($rutaCompletaStorage);
                }
                $file = $request->file('video');
                $rutaDestino = 'videos/courses/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $course->video = $rutaDestino . $nombreArchivo;
            }

            if ($request->state == false) {
                $course->state = false;
            } elseif ($request->state == true) {
                $course->state = true;
            }

            $course->save();

            return Inertia::render("Dashboard/Admin/Course/Index", [
                "courses" => Course::with('coursecategory')->get(),
                'difficulties' => Coursedifficulty::all(),
                'professors' => Professor::all(),
                'categories' => Coursecategory::all(),
                'url' => env('APP_URL'),
            ])->with('toast', [
                        'mensaje' => 'Curso actualizado.',
                        'tipo' => 'success',
                    ]);
            ;
        }
    }

    public function show($id)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            return Inertia::render("Dashboard/Admin/Course/Show", [
                'course' => Course::with('coursecategory', 'professor', 'coursedifficulty')->find($id),
                'difficulties' => Coursedifficulty::all(),
                'professors' => Professor::all(),
                'categories' => Coursecategory::all(),
                'modules' => Module::where('course_id', $id)->get(),

                'lessons' => Lesson::whereHas('module', function ($query) use ($id) {
                    $query->where('course_id', $id);
                })->get(),


                'url' => env('APP_URL'),
            ]);
        }
    }

    public function show_course_landing($id, $slug)
    {
        MercadoPagoConfig::setAccessToken(env('MP_ACCESS_TOKEN'));
        $course = Course::with('coursecategory', 'professor', 'coursedifficulty')->find($id);

        $client = new PreferenceClient();
        $preference = $client->create([
            "external_reference" => "teste",
            "items" => array(
                array(
                    "description" => $course->short_description,
                    "title" => $course->title,
                    "quantity" => 1,
                    "unit_price" => $course->price,
                    "picture_url" => "http://www.myapp.com/myimage.jpg",
                )
            ),
            "payment_methods" => [
                "default_payment_method_id" => "master",
                "excluded_payment_types" => array(
                    array(
                        "id" => "ticket"
                    )
                ),
                "installments" => 12,
                "default_installments" => 1
            ],
        ]);

        return Inertia::render('Dashboard/Admin/Course/Landing', [
            'course' => $course,
            'modules' => Module::where('course_id', $id)->get(),
            'lessons' => Lesson::whereHas('module', function ($query) use ($id) {
                $query->where('course_id', $id);
            })->get(),
            'url' => env('APP_URL'),
            'preference' => $preference,
            'key' => env('MP_PUBLIC_KEY'),
        ]);
    }

    public function show_content($course_id, $course_slug)
    {
        return Inertia::render('Dashboard/Admin/Course/Lesson/Show', [
            'course' => Course::with('coursecategory', 'professor', 'coursedifficulty')->find($course_id),
            'modules' => Module::where('course_id', $course_id)->get(),
            'lessons' => Lesson::whereHas('module', function ($query) use ($course_id) {
                $query->where('course_id', $course_id);
            })->get(),
            'url' => env('APP_URL'),
        ]);
    }
}
