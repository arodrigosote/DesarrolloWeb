<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Servicecategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Admin/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $categories = Servicecategory::all();
            return Inertia::render("Admin/Services/Index", compact("categories"))->with("success", "Operacion exitosa");
        }
    }

    public function servicecategory_store(Request $request)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Admin/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $service_category = Servicecategory::create($request->all());
            $categories = Servicecategory::all();
            return Inertia::render("Admin/Services/Index", compact("categories"))->with("success", "Operacion exitosa");
        }
    }
    public function servicecategory_update(Request $request, $id)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Admin/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $category = Servicecategory::findOrFail($id);
            $category->update($request->all());
            $categories = Servicecategory::all();
            return Inertia::render("Admin/Services/Index", compact("categories"))->with("success", "Operacion exitosa");
        }
    }
    public function servicecategory_destroy(Request $request)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Admin/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $category = Servicecategory::findOrFail($request->id);
            $category->delete();
            $categories = Servicecategory::all();
            return Inertia::render("Admin/Services/Index", compact("categories"))->with("success", "Operacion exitosa");
        }
    }


    public function services($id)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Admin/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $services = Service::where('category_id', $id)->get();
            $category = Servicecategory::find($id);
            return Inertia::render("Admin/Services/Category/Index", compact("services",'category'))->with("success", "Operacion exitosa");
        }
    }
}
