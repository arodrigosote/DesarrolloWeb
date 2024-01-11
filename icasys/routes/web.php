<?php

use App\Http\Controllers\DayController;
use App\Http\Controllers\HourController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\StudentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('dias', DayController::class);
    Route::get('/dias', [DayController::class, "index"])->name("day.index");

    Route::resource("/horas", HourController::class);
    Route::get("/horas", [HourController::class,"index"])->name('horas.index');

    Route::resource("/horarios", ScheduleController::class);
    Route::resource("/profesores", ProfessorController::class);
    Route::resource("/grupos", GroupController::class);
    Route::resource("/alumnos", StudentController::class);
});



// Normal pages
Route::get('/', [PagesController::class, "home"])->name('page.home');
Route::get('/contacto', [PagesController::class, "contact"])->name('page.contact');
Route::get('/acerca-de', [PagesController::class, "about"])->name('page.about');

//dashboard
Route::get('/escritorio', [DashboardController::class, "dashboard"])->name('dashboard.home')->middleware(['auth', 'verified']);

//ADMIN DASHBOARD
// Route::get('administrador/dias', [DayController::class, "index"])->name("index.day");
// Route::post("administrador/dia/agregar", [DayController::class,"create"])->name("create.day");




require __DIR__ . '/auth.php';
