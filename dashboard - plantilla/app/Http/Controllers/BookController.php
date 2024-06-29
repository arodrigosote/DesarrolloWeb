<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    //

    public function book(){
        return Inertia::render('Main/Book');
    }
}
