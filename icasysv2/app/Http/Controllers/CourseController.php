<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Coursecategory;
use App\Models\Coursedifficulty;
use App\Models\Lesson;
use App\Models\Module;
use App\Models\Professor;
use App\Models\Pucharse;
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
        $course = Course::with('coursecategory', 'professor', 'coursedifficulty')->find($id);
        $user = auth()->user();
        $pucharse = Pucharse::where('course_id',$course->id)->where('user_id',$user->id)->where('state', 'payed')->first();
        if($pucharse){
            $payed = true;
        }else{
            $payed = false;
        }


        return Inertia::render('Dashboard/Admin/Course/Landing', [
            'course' => $course,
            'modules' => Module::where('course_id', $id)->get(),
            'lessons' => Lesson::whereHas('module', function ($query) use ($id) {
                $query->where('course_id', $id);
            })->get(),
            'url' => env('APP_URL'),
            'payed' => $payed,
            'pucharse' => $pucharse,
        ]);
    }

    public function cart_course($course_id, $course_slug)
    {
        // Use environment variables for sensitive information
        $accessToken = env('MP_ACCESS_TOKEN');
        MercadoPagoConfig::setAccessToken($accessToken);

        $course = Course::with('coursecategory', 'professor', 'coursedifficulty')->find($course_id);

        $client = new PreferenceClient();

        try {
            $preference = $client->create([
                "external_reference" => "course_" . $course_id, // Use course ID for reference
                "items" => [
                    [
                        "description" => $course->short_description,
                        "title" => $course->title,
                        "quantity" => 1,
                        "unit_price" => $course->price,
                        "picture_url" => "http://www.myapp.com/myimage.jpg",
                    ]
                ],
                "payment_methods" => [
                    "default_payment_method_id" => "master",
                    "excluded_payment_types" => [
                        ["id" => "ticket"]
                    ],
                    "installments" => 12,
                    "default_installments" => 1
                ],
                "back_urls" => [
                    "success" => route('payment.success', ['course_id' => $course->id, 'id' => $course->id, 'slug' => $course->slug]),
                    "failure" => route('payment.failure', ['course_id' => $course->id, 'id' => $course->id, 'slug' => $course->slug]),
                    "pending" => route('payment.pending', ['course_id' => $course->id, 'id' => $course->id, 'slug' => $course->slug])
                ]
            ]);
        } catch (Exception $e) {
            // Handle preference creation error gracefully (e.g., log error, display user-friendly message)
            return redirect()->back()->withErrors(['error' => 'Failed to create payment preference']);
        }

        // $preference->back_urls = array(

        // );

        $preference->auto_return = "approved";

        return Inertia::render('Dashboard/Admin/Payment/CoursePayment', [
            'course' => $course,
            'modules' => Module::where('course_id', $course_id)->get(),
            'lessons' => Lesson::whereHas('module', function ($query) use ($course_id) {
                $query->where('course_id', $course_id);
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
