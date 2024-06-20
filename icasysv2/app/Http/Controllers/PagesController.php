<?php

namespace App\Http\Controllers;

use App\Models\Contactmessages;
use App\Models\Course;
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
    public function contact_message(Request $request){
        $message = Contactmessages::create([
            'name'=> $request->name,
            'subject' => $request->subject,
            'email' => $request->email,
            'content' => $request->content
        ]);
    }

    public function about(){
        return Inertia::render("MainPages/About");
    }

    public function services(){
        return Inertia::render("MainPages/Services");
    }

    public function courses(){
        return Inertia::render('MainPages/Courses',[
            'courses' => Course::with('professor')->where('state', 1)->get(),
            'url' => env('APP_URL'),
        ]);
    }
}
