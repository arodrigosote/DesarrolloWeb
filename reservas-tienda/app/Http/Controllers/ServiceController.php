<?php

namespace App\Http\Controllers;

use App\Models\Duration;
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




    public function services($category_id)
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Admin/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $services = Service::where('category_id', $category_id)->get();
            $category = Servicecategory::find($category_id);
            $durations = Duration::all();
            return Inertia::render("Admin/Services/Category/Index", compact("services",'category', 'durations'))->with("success", "Operacion exitosa");
        }
    }
    public function service_store(Request $request){
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Admin/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            $service = Service::create($request->all());
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $rutaDestino = 'images/services/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $service->image = $rutaDestino . $nombreArchivo;
            } else {
                $service->image = 'images/services/no-service.webp';
            }
            $service->save();

            $services = Service::where('category_id', $request->category_id)->get();
            $category = Servicecategory::find($request->category_id);
            $durations = Duration::all();
            return Inertia::render("Admin/Services/Category/Index", compact("services",'category', 'durations'))->with("success", "Operacion exitosa");
        }
    }
    public function service_update($category_id, $service_id){
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Admin/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {

        }
    }
    public function service_destroy($category_id){
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Admin/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {

        }
    }
}
