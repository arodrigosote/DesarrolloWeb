<?php

namespace App\Http\Controllers;

use App\Models\Classsubjectgroup;
use App\Models\Studentclasssubject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class StudentclassController extends Controller
{
    //
    public function showGrades($grade_id){
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            // dd($grade_id);
            return Inertia::render("Dashboard/Admin/Group/Grades",[
                'grades' => Studentclasssubject::with('student')->where('class_subject_group_id', $grade_id)->get(),
                'lesson' => Classsubjectgroup::with('subjectgroup', 'subjectgroup.subject')->find($grade_id),
            ]);
        }
    }
    public function updateGrades(Request $request, $grade_id){
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $grade = Studentclasssubject::find($grade_id);
            $grade->grade = $request->grade;
            $grade->note = $request->note;
            if($request->attendance){
                $grade->attendance = $request->attendance;
            }
            if($request->attendance == false){
                $grade->attendance = $request->attendance;
            }
            $grade->save();
        }
    }
}
