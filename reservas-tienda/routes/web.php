<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
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

Route::get('/reservar', [BookController::class, 'book'])->name('reservar');
Route::get('/home', [PagesController::class, 'home'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/escritorio', [PagesController::class, 'home'])->name('home');

    Route::get('/categorias-servicios', [ServiceController::class, 'index'])->name('servicecategory');
    Route::post('/categorias-servicios', [ServiceController::class, 'servicecategory_store'])->name('servicecategory.store');
    Route::put('/categorias-servicios/{id}', [ServiceController::class, 'servicecategory_update'])->name('servicecategory.update');
    Route::delete('/categorias-servicios', [ServiceController::class, 'servicecategory_destroy'])->name('servicecategory.destroy');

    Route::get('/categoria/{category_id}/', [ServiceController::class, 'services'])->name('services');
    Route::post('/servicio', [ServiceController::class, 'service_store'])->name('service.store');
    Route::put('/servicio/{service_id}/', [ServiceController::class, 'service_update'])->name('service.update');
    Route::delete('/servicio/{service_id}/', [ServiceController::class, 'service_destroy'])->name('service.destroy');
});

require __DIR__.'/auth.php';
