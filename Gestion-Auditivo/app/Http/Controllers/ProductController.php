<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        if (Gate::allows("isAdmin")) {
            return Inertia::render('Products/Index', [
                'products' => Product::all(),
            ]);
        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }
}
