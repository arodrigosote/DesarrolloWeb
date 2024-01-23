<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Grade;
use App\Models\Group;
use App\Models\Inscription;
use App\Models\Locations;
use App\Models\Professor;
use App\Models\Receipt;
use App\Models\Schedule;
use App\Models\Student;
use App\Models\Studentpayment;
use App\Models\Tutor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\File;
use Dompdf\Dompdf;
use Dompdf\Options;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;


class StudentController extends Controller
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
            return Inertia::render('Dashboard/Admin/Student/Index', [
                'students' => Student::where('active', 1)->with('group.schedule', 'group.schedule.day', 'group.schedule.hour', 'group.professor', 'tutor')->get(),
                'groups' => Group::with('professor', 'schedule.day', 'schedule.hour')->get(),
                'grades' => Grade::all(),
                'activities' => Activity::all(),
                'locations' => Locations::all(),
                'inscriptions' => Inscription::all(),
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
            // dd($request->active);
            $request->validate(Student::$rules);

            $tutor = Tutor::create([
                'name' => $request->tutor_name,
                'email' => $request->tutor_email,
                'phone' => $request->tutor_phone,
                'occupation' => $request->tutor_occupation
            ]);

            $student = Student::create($request->all());
            if ($request->active) {
                $student->active = 1;
            } else {
                $student->active = 0;
            }
            $password = bcrypt('usualuica');

            // Crear un nuevo registro en la tabla 'users'
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $password,
                // Otros campos de 'users' que necesites completar
            ]);
            $user->rol = 0;

            if ($request->hasFile('profile_pic')) {
                $file = $request->file('profile_pic');
                $rutaDestino = 'images/students/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $student->profile_pic = $rutaDestino . $nombreArchivo;
                $user->profile_pic = $rutaDestino . $nombreArchivo;
            } else {
                $student->profile_pic = 'images/students/user.jpg';
                $user->profile_pic = 'images/students/user.jpg';
            }
            if ($request->hasFile('credential_pic')) {
                $file = $request->file('credential_pic');
                $rutaDestino = 'images/students/credentials/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $student->credential_pic = $rutaDestino . $nombreArchivo;
            } else {
                $student->credential_pic = 'images/students/user.jpg';
            }

            $student->user_id = $user->id;
            $student->tutor_id = $tutor->id;

            $student->save();
            $user->save();
            $tutor->save();
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
            return Inertia::render('Dashboard/Admin/Student/Show', [
                'student' => Student::find($id),
                'baseUrl' => env('APP_URL'),
            ]);
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
            request()->validate(Student::$rules);
            $student = Student::find($id);
            // Ruta relativa al archivo en la carpeta storage
            $rutaRelativaStorage = $student->profile_pic;
            // Ruta relativa al archivo en la carpeta storage
            $rutaRelativaStorage2 = $student->credential_pic;

            $student->update($request->all());

            $user = User::find($student->user_id);
            if ($user) {
                $user->email = $student->email;
                $user->name = $student->name;
                $user->save();
            }

            $tutor = Tutor::find($student->tutor_id);
            if ($tutor) {
                $tutor->name = $request->tutor_name;
                $tutor->email = $request->tutor_email;
                $tutor->occupation = $request->tutor_occupation;
                $tutor->phone = $request->phone;
                $tutor->save();
            }

            if ($request->hasFile('profile_pic')) {

                if ($rutaRelativaStorage == 'images/students/user.jpg') {
                    $file = $request->file('profile_pic');
                    $rutaDestino = 'images/students/';
                    $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                    $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                    $student->profile_pic = $rutaDestino . $nombreArchivo;
                    if ($user) {
                        $user->profile_pic = $rutaDestino . $nombreArchivo;
                        $user->save();
                    }
                } else {
                    // Construye la ruta completa al archivo en la carpeta storage
                    $rutaCompletaStorage = storage_path('app/public/' . $rutaRelativaStorage);
                    // Verifica si el archivo existe
                    if (File::exists($rutaCompletaStorage)) {
                        // Elimina el archivo
                        File::delete($rutaCompletaStorage);
                    }
                    $file = $request->file('profile_pic');
                    $rutaDestino = 'images/students/';
                    $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                    $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                    $student->profile_pic = $rutaDestino . $nombreArchivo;
                    if ($user) {
                        $user->profile_pic = $rutaDestino . $nombreArchivo;
                        $user->save();
                    }
                }


            }

            if ($request->hasFile('credential_pic')) {
                // Construye la ruta completa al archivo en la carpeta storage
                $rutaCompletaStorage2 = storage_path('app/public/' . $rutaRelativaStorage2);
                // Verifica si el archivo existe
                if (File::exists($rutaCompletaStorage2)) {

                    // Elimina el archivo
                    File::delete($rutaCompletaStorage2);
                }
                $file = $request->file('credential_pic');
                $rutaDestino = 'images/students/credentials/';
                $nombreArchivo = time() . '-' . $student->nombre . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $student->credential_pic = $rutaDestino . $nombreArchivo;
            }

            $student->save();
            $user->save();
        }
    }

    public function showStudentPayment($id)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            return Inertia::render('Dashboard/Admin/Student/Payment', [
                'student' => Student::find($id),
                'baseUrl' => env('APP_URL'),
                'payments' => Studentpayment::where('student_id', $id)->get(),

            ]);
        }
    }


    public function storeStudentPayment(Request $request)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            try {
                // dd($requestData = $request->json());
                $requestData = $request->json();

                $student = Student::find($request->student_id);

                $receipt = Receipt::create([
                    'student_id' => $request->student_id,
                    'amount' => 0,
                    'date_payment' => $student->created_at,
                    'weeks_number' => 0,
                ]);

                // Contar elementos con valor true
                $trueCount = 0;
                foreach ($requestData as $key => $value) {

                    if (strpos($key, "week_topay_number_") === 0) {
                        $week_topay_number = $value;
                    } else if (strpos($key, "week_topay_date_") === 0) {
                        $week_topay_date = $value;
                    } else if (strpos($key, "payment_date_") === 0) {
                        $payment_date = $value;
                    } else if (strpos($key, "payment_check_") === 0 && $value === true) {
                        $payment_check = $value;
                        $payment = Studentpayment::create([
                            'student_id' => $student->id,
                            'payment_day' => $payment_date,
                            'week_topay_number' => $week_topay_number,
                            'week_topay_date' => $week_topay_date,
                            'receipt_id' => $receipt->id,
                        ]);
                        $trueCount++;
                    }
                }

                $receipt->amount = $student->tuition * $trueCount;
                $receipt->date_payment = $payment->payment_day;
                $receipt->weeks_number = $trueCount;
                $receipt->save();


                return Inertia::render('Dashboard/Admin/Student/Receipts', [
                    'student' => $student,
                    'baseUrl' => env('APP_URL'),
                    'receipts' => Receipt::where('student_id', $student->id)->with('student')->orderBy('created_at', 'desc')->get(),
                ])->with('toast', [
                            'mensaje' => 'Pagos agregados con éxito.',
                            'tipo' => 'success',
                        ]);

            } catch (Throwable $th) {
                throw $th;
            }
        }
    }

    public function showStudentReceipts($id)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            return Inertia::render('Dashboard/Admin/Student/Receipts', [
                'student' => Student::find($id),
                'baseUrl' => env('APP_URL'),
                'receipts' => Receipt::with('student')->where('student_id', $id)->orderBy('created_at', 'desc')->get(),
            ]);
        }
    }
}
