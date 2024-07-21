<?php

namespace App\Http\Controllers;


use App\Models\Classsubjectgroup;
use App\Models\Group;
use App\Models\Professor;
use App\Models\Receipt;
use App\Models\Schedule;
use App\Models\Student;
use App\Models\Studentclasssubject;
use App\Models\Studentpayment;
use App\Models\Subject;
use App\Models\Subjectgroup;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class GroupController extends Controller
{
    //
    public function index()
    {
        if (Gate::allows("isProfessor")) {
            $user = auth()->user();
            $professor = Professor::where('user_id', $user->id)->first(); // Corregido
            return Inertia::render("Dashboard/Admin/Group/Index", [
                "groups" => Group::with('professor', 'schedule.day', 'schedule.hour')
                    ->where('professor_id', $professor->id)
                    ->get(),
                "professors" => Professor::all(),
                "schedules" => Schedule::with('day', 'hour')->get(),
            ]);

        } else if (Gate::allows("isAdmin")) {
            $user = auth()->user();
            return Inertia::render("Dashboard/Admin/Group/Index", [
                "groups" => Group::with('professor', 'schedule.day', 'schedule.hour')->where('active', 1)->get(),
                "noactive_groups" => Group::with('professor', 'schedule.day', 'schedule.hour')->where('active', 0)->get(),
                "professors" => Professor::all(),
                "schedules" => Schedule::with('day', 'hour')->get(),
            ]);
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
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
            $group = Group::create();
            $group->professor_id = $request->professor_id;
            $group->schedule_id = $request->schedule_id;
            $group->save();
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
            $group = Group::findOrFail($id);
            $group->professor_id = $request->professor_id;
            $group->schedule_id = $request->schedule_id;
            if ($request->active) {
                $group->active = 1;
            } else {
                $group->active = 0;
            }
            $group->save();
        }
    }

    public function destroy($id)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $group = Group::findOrFail($id);
            $group->delete();
        }
    }

    public function show($id)
    {
        if (Gate::allows("isProfessor") || Gate::allows("isAdmin")) {
            return Inertia::render("Dashboard/Admin/Group/Show", [
                'group' => Group::with('schedule', 'schedule.hour', 'schedule.day', 'professor')->find($id),
                'students' => Student::where('group_id', $id)->get(),
            ]);
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }


    public function showSubjects($id)
    {
        if (Gate::allows("isProfessor") || Gate::allows("isAdmin")) {
            return Inertia::render("Dashboard/Admin/Group/Subjects", [
                'subjectsgroup' => Subjectgroup::with('subject')->where('group_id', $id)->get(),
                'group' => Group::with('schedule', 'schedule.day', 'schedule.hour', 'professor')->find($id),
                'subjects' => Subject::all(),
            ]);
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function storeSubjects(Request $request)
    {
        if (Gate::allows("isProfessor") || Gate::allows("isAdmin")) {
            $subjectgroup = SubjectGroup::create([
                'group_id' => $request->input('group_id'),
                'subject_id' => $request->input('subject_id'),
                'start_date' => $request->input('start_date'),
                'finish_date' => $request->input('finish_date'),
            ]);
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function updateSubjects(Request $request, $id)
    {
        if (Gate::allows("isProfessor") || Gate::allows("isAdmin")) {
            $subjectgroup = SubjectGroup::find($id);
            $subjectgroup->update([
                'group_id' => $request->input('group_id'),
                'subject_id' => $request->input('subject_id'),
                'start_date' => $request->input('start_date'),
                'finish_date' => $request->input('finish_date'),
            ]);
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function deleteSubjects($id)
    {
        if (Gate::allows("isProfessor") || Gate::allows("isAdmin")) {
            $subjectgroup = SubjectGroup::find($id);
            $subjectgroup->delete();
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function showLessons($subjectgroup_id, $group_id)
    {
        if (Gate::allows("isProfessor") || Gate::allows("isAdmin")) {
            return Inertia::render("Dashboard/Admin/Group/Lessons", [
                'lessons' => Classsubjectgroup::where('subjectgroup_id', $subjectgroup_id)->get(),
                'group' => Group::find($group_id),
                'subjectgroup' => Subjectgroup::with('subject')->find($subjectgroup_id),
            ]);
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function storeLessons(Request $request)
    {
        if (Gate::allows("isProfessor") || Gate::allows("isAdmin")) {
            $classsubjectgroup = Classsubjectgroup::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'date' => $request->input('date'),
                'subjectgroup_id' => $request->input('subjectgroup_id'),
                'group_id' => $request->input('group_id'),
            ]);
            $students = Student::where('group_id', $request->input('group_id'))->get();
            foreach ($students as $student) {
                $Studentclasssubject = Studentclasssubject::create([
                    'student_id' => $student->id,
                    'class_subject_group_id' => $classsubjectgroup->id,
                ]);
            }
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function updateLessons(Request $request, $id)
    {
        if (Gate::allows("isProfessor") || Gate::allows("isAdmin")) {
            $classsubjectgroup = Classsubjectgroup::find($id);
            $classsubjectgroup->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'date' => $request->input('date'),
                'subjectgroup_id' => $request->input('subjectgroup_id'),
                'group_id' => $request->input('group_id'),
            ]);
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }
    public function deleteLessons($id)
    {
        if (Gate::allows("isProfessor") || Gate::allows("isAdmin")) {
            $classsubjectgroup = Classsubjectgroup::find($id);
            $classsubjectgroup->delete();
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function payments()
    {
        if (Gate::allows("isAdmin")) {
            $user = auth()->user();
            return Inertia::render("Dashboard/Admin/Group/Payments/Payments", [
                "groups" => Group::with('professor', 'schedule.day', 'schedule.hour')->get(),
                "professors" => Professor::all(),
                "schedules" => Schedule::with('day', 'hour')->get(),
            ]);
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function make_payments($group_id)
    {
        if (Gate::allows("isAdmin")) {
            return Inertia::render("Dashboard/Admin/Group/Payments/Make", [
                'group' => Group::with('schedule', 'schedule.hour', 'schedule.day', 'professor')->find($group_id),
                'students' => Student::with('receipts', 'receipts.studentpayments', 'group', 'group.schedule', 'group.schedule.day', 'group.schedule.hour')->where('group_id', $group_id)->get(),
                'baseUrl' => env('APP_URL'),
            ]);
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function store_payments(Request $request)
    {
        if (Gate::allows("isAdmin")) {

            // dd($requestData = $request->json());
            $requestData = $request->json();

            $week_topay_date = $request->date;

            // Contar elementos con valor true
            $trueCount = 0;
            foreach ($requestData as $key => $value) {

                if (strpos($key, "student_id_") === 0) {
                    $student_id = $value;
                } else if (strpos($key, "payment_date_") === 0) {
                    $payment_date = $value;
                } else if (strpos($key, "payment_check_") === 0 && $value === true) {
                    // $payment_check = $value;
                    $student = Student::find($student_id);

                    // Suponiendo que $firstDay y $paymentDate son instancias de DateTime
                    $firstDay = new DateTime($student->firstday); // Reemplaza con tu fecha de inicio
                    $paymentDate = new DateTime($week_topay_date); // Reemplaza con tu fecha de pago

                    // Calcula la diferencia en días
                    $interval = $firstDay->diff($paymentDate);
                    $daysDifference = $interval->days;

                    // Calcula el número de semanas
                    $week_topay_number = intdiv($daysDifference, 7) + 1; // Se suma 1 porque la primera semana es la semana 1

                    $receipt = Receipt::create([
                        'student_id' => $student->id,
                        'amount' => $student->tuition,
                        'date_payment' => $week_topay_date,
                        'weeks_number' => 1,
                    ]);

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

            return Inertia::render("Dashboard/Admin/Group/Payments/Make", [
                'group' => Group::with('schedule', 'schedule.hour', 'schedule.day', 'professor')->find($student->group_id),
                'students' => Student::with('receipts', 'receipts.studentpayments', 'group', 'group.schedule', 'group.schedule.day', 'group.schedule.hour')->where('group_id', $student->group_id)->get(),
                'baseUrl' => env('APP_URL'),
            ])->with('toast', [
                        'mensaje' => 'Pagos agregados con éxito.',
                        'tipo' => 'success',
                    ]);
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

}
