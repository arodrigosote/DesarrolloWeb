<?php

namespace App\Http\Controllers;

use App\Models\Professor;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;

class ProfessorController extends Controller
{
    //
    public function index()
    {
        return Inertia::render("Dashboard/Admin/Professor/Index", [
            "professors" => Professor::all(),
        ]);
    }
    public function store(Request $request)
    {
        // dd($request);
        request()->validate(Professor::$rules);
        $professor = Professor::create([
            "name"=> $request->name,
            "email"=> $request->email,
            "phone" => $request->phone,
            "skill" => $request->skill,
            "career" => $request->career,
            "biography" => $request->biography,
            "facebook_url" => $request->facebook_url,
            "github_url" => $request->github_url,
            "x_url" => $request->x_url,
            "linkedin_url" => $request->linkedin_url,
            "web_url" => $request->web_url,
        ]);

        $password = bcrypt('usumaeica');

        // Crear un nuevo registro en la tabla 'users'
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $password,
            // Otros campos de 'users' que necesites completar
        ]);
        $user->rol = 1;

        if ($request->hasFile('picture')) {
            $file = $request->file('picture');
            $rutaDestino = 'images/professors/';
            $nombreArchivo = time() . '-' . $file->getClientOriginalName();
            $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
            $professor->picture = $rutaDestino . $nombreArchivo;
            $user->profile_pic = $rutaDestino . $nombreArchivo;
        } else {
            $professor->picture = 'images/professor/user.jpg';
            $user->profile_pic = 'images/professor/user.jpg';
        }


        $userId = $user->id; // Obtener el ID del usuario recién creado

        $professor->user_id = $userId;

        $professor->save();
        $user->save();

        return Inertia::render("Dashboard/Admin/Professor/Index", [
            "professors" => Professor::all(),
        ]);
    }
}
