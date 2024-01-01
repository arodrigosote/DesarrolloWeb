<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{
    //

    public function home(){
        return Inertia::render("MainPages/Home");
    }

    public function contact(){
        return Inertia::render("MainPages/Contact");
    }

    public function about(){
        return Inertia::render("MainPages/About");
    }
}
