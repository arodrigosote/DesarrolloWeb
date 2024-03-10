<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Student;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ProfileController extends Controller
{

    public function show(Request $request){
        return Inertia::render('Profile/Show', [
            'url' => env('APP_URL'),
            'student' => Student::where('user_id', $request->user()->id)->with('group', 'group.professor', 'group.schedule', 'group.schedule.day', 'group.schedule.hour')->first(),

        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        $rutaRelativaStorage = $request->user()->profile_pic;

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $student = Student::where('user_id', $request->user()->id)->first();

        if ($request->hasFile('profile_pic')) {

            if ($rutaRelativaStorage == 'images/users/user.jpg') {
                $file = $request->file('profile_pic');
                $rutaDestino = 'images/users/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $request->user()->profile_pic = $rutaDestino . $nombreArchivo;

                if ($student) {
                    $student->profile_pic = $rutaDestino . $nombreArchivo;
                    $student->save();
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
                $rutaDestino = 'images/users/';
                $nombreArchivo = time() . '-' . $file->getClientOriginalName();
                $moverArchivo = $file->storeAs($rutaDestino, $nombreArchivo, 'storage'); // Usar el disco 'storage'
                $request->user()->profile_pic = $rutaDestino . $nombreArchivo;

                if ($student) {
                    $student->profile_pic = $rutaDestino . $nombreArchivo;
                    $student->save();
                }
            }
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
