<?php

namespace App\Http\Controllers;

use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class ModuleController extends Controller
{
    //
    public function store(Request $request){
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $module = Module::create([
                'name'=> $request->name,
                'course_id' => $request->course_id,
                'short_description' => $request->short_description,
            ]);
        }
    }

    public function update(Request $request, $id){
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $module = Module::find($id);
            $module->name = $request->name;
            $module->short_description = $request->short_description;
            $module->save();
        }
    }

    public function delete($id){
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $module = Module::find($id);
            $module->delete();
        }
    }
}
