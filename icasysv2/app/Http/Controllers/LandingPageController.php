<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    //
    public function web_site(){
        return Inertia::render("Landings/Websites");
    }
}
