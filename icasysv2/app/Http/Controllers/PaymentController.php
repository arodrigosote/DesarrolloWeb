<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Pucharse;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\File;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    //
    public function success($course_id)
    {

        if (Gate::denies("isUser")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No eres alumno.',
                'tipo' => 'error',
            ]);
        } else {
            $user = auth()->user();
            $course = Course::findOrFail($course_id);

            $pucharse_bool = Pucharse::where('user_id', $user->id)->where('course_id', $course_id)->first();

            if ($pucharse_bool == null) {
                $pucharse = Pucharse::create([
                    'user_id' => $user->id,
                    'course_id' => $course_id,
                    'amount' => $course->price,
                    'state' => 'payed'
                ]);
                $pucharse->save();
            } else {

            }
            return Inertia::render('Dashboard/Student/Courses/MyCourses', [
                'pucharses' => Pucharse::with('course', 'course.coursecategory')->where('state', 'payed')->where('user_id', $user->id)->get(),
                'url'=>env('APP_URL'),
            ])->with('toast', [
                        'mensaje' => '¡Compra realizada con éxito!',
                        'tipo' => 'success',
                    ]);
        }
    }

    public function pending($course_id)
    {
        $user = auth()->user();
        $course = Course::findOrFail($course_id);


        return Inertia::render('Dashboard/Student/Courses/MyCourses', [
            'pucharses' => Pucharse::with('course', 'course.coursecategory')->where('state', 'payed')->where('user_id', $user->id)->get(),
            'url'=>env('APP_URL'),
        ])->with('toast', [
                    'mensaje' => 'Su compra está siendo procesada, en breve podrá acceder al curso',
                    'tipo' => 'warning',
        ]);
    }

    public function failure($course_id)
    {
        if (Gate::denies("isUser")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No eres alumno.',
                'tipo' => 'error',
            ]);
        } else {
            $user = auth()->user();
            $course = Course::findOrFail($course_id);


            return Inertia::render('Dashboard/Student/Courses/MyCourses', [
                'pucharses' => Pucharse::with('course', 'course.coursecategory')->where('state', 'payed')->where('user_id', $user->id)->get(),
                'url'=>env('APP_URL'),
            ])->with('toast', [
                        'mensaje' => 'Hubo un error al procesar su compra, por favor inténtelo de nuevo',
                        'tipo' => 'error',
            ]);
        }
    }
}
