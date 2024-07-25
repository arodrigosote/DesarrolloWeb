<?php

use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    // -----------------------------------------------------------------------------------------------------------------------
    // SETTINGS ROUTES -------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------------
    Route::get('/ajustes', [SettingsController::class, 'index'])->name('admin.settings');
    // BRANCHES
    Route::get('/ajustes/sucursales', [SettingsController::class, 'index_branches'])->name('admin.settings.branches');
    Route::post('/ajustes/sucursales', [SettingsController::class, 'store_branches'])->name('admin.settings.branches.store');
    Route::post('/ajustes/sucursales/{id}', [SettingsController::class, 'update_branches'])->name('admin.settings.branches.update');
    Route::delete('/ajustes/sucursales/{id}', [SettingsController::class, 'destroy_branches'])->name('admin.settings.branches.destroy');
    Route::get('/ajustes/empleados', [SettingsController::class, 'index_employees'])->name('admin.settings.employees');

    //PATIENTS
    Route::get('/pacientes', [PatientController::class, 'index'])->name('patient.index');
    Route::post('/pacientes', [PatientController::class, 'store'])->name('patient.store');
    Route::post('/pacientes/{id}', [PatientController::class, 'update'])->name('patient.update');
    Route::delete('/pacientes/{id}', [PatientController::class, 'destroy'])->name('patient.destroy');
    Route::get('/paciente/mostrar/{id}', [PatientController::class, 'show'])->name('patient.show');
});

require __DIR__.'/auth.php';
