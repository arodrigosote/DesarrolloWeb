<?php

use Illuminate\Support\Facades\Route;


// Puedes definir más rutas aquí
Route::post('/reserva', [WhatsAppController::class, 'hello_world']);
