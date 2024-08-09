<?php

use App\Http\Controllers\AudiometryController;
use App\Http\Controllers\BinnacleController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\ProductController;
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

    //BINNACLE
    Route::get('/bitacora', [BinnacleController::class, 'index'])->name('binnacle.index');
    Route::post('/bitacora', [BinnacleController::class, 'store'])->name('binnacle.store');

    //PATIENTS
    Route::get('/pacientes', [PatientController::class, 'index'])->name('patient.index');
    Route::post('/pacientes', [PatientController::class, 'store'])->name('patient.store');
    Route::post('/pacientes/{id}', [PatientController::class, 'update'])->name('patient.update');
    Route::delete('/pacientes/{id}', [PatientController::class, 'destroy'])->name('patient.destroy');
    Route::get('/paciente/mostrar/{id}', [PatientController::class, 'show'])->name('patient.show');
    //FullData
    Route::post('/paciente/mostrar/fulldata', [PatientController::class, 'store_fulldata'])->name('patient.store.fulldata');
    Route::post('/paciente/mostrar/fulldata/{id}', [PatientController::class, 'update_fulldata'])->name('patient.update.fulldata');
    //Audiometries
    Route::post('/paciente/mostrar/audiometria', [AudiometryController::class, 'store'])->name('patient.store.audiometry');
    Route::post('/paciente/editar/audiometria/{id}', [AudiometryController::class, 'update'])->name('patient.update.audiometry');
    Route::delete('/paciente/eliminar/audiometria/{id}', [AudiometryController::class, 'destroy'])->name('patient.destroy.audiometry');

    //EMPLOYEES
    Route::get('/ajustes/empleados', [EmployeeController::class, 'index'])->name('employee.index');
    Route::post('/ajustes/empleados', [EmployeeController::class, 'store'])->name('employee.store');
    Route::post('/ajustes/empleados/{id}', [EmployeeController::class, 'update'])->name('employee.update');
    Route::delete('/ajustes/empleados/{id}', [EmployeeController::class, 'destroy'])->name('employee.destroy');
    Route::get('/ajustes/empleado/mostrar/{id}', [EmployeeController::class, 'show'])->name('employee.show');
    // Route::get('/ajustes/empleados', [SettingsController::class, 'index_employees'])->name('admin.settings.employees');

    //PRODUCTS
    Route::get('/productos', [ProductController::class, 'index'])->name('product.index');
    Route::post('/productos', [ProductController::class, 'store'])->name('product.store');
    Route::post('/productos/{id}', [ProductController::class, 'update'])->name('product.update');
    Route::delete('/productos/{id}', [ProductController::class, 'destroy'])->name('product.destroy');
});

require __DIR__ . '/auth.php';
