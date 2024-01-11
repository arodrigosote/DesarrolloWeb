<?php

namespace App\Http\Controllers;


use App\Models\Group;
use App\Models\Professor;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class GroupController extends Controller
{
    //
    public function index(){
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }else{
            return Inertia::render("Dashboard/Admin/Group/Index", [
                "groups" => Group::with('professor', 'schedule.day', 'schedule.hour')->get(),
                "professors" => Professor::all(),
                "schedules" => Schedule::with('day', 'hour')->get(),
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
        }else{
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
        }else{
            $group = Group::findOrFail($id);
            $group->professor_id = $request->professor_id;
            $group->schedule_id = $request->schedule_id;
            if($request->active){
                $group->active = 1;
            }else{
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
        }else{
            $group = Group::findOrFail($id);
            $group->delete();
        }
    }
}
