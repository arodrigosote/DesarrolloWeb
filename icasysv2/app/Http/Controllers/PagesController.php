<?php

namespace App\Http\Controllers;

use App\Models\Contactmessages;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class PagesController extends Controller
{
    //

    public function home()
    {
        return Inertia::render("MainPages/Home");
    }

    public function contact()
    {
        return Inertia::render("MainPages/Contact");
    }
    public function contact_message(Request $request)
    {
        $message = Contactmessages::create([
            'name' => $request->name,
            'subject' => $request->subject,
            'email' => $request->email,
            'content' => $request->content
        ]);
    }
    public function show_contact_messages()
    {
        if (Gate::denies("isAdmin")) {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        } else {
            return Inertia::render("Dashboard/Admin/ContactMessages/Index", [
                'messages' => Contactmessages::orderBy('created_at', 'desc')->get()
            ]);

        }
    }

    public function transparency() {
        return Inertia::render("MainPages/Transparency");
    }

    public function about()
    {
        return Inertia::render("MainPages/About");
    }

    public function services()
    {
        return Inertia::render("MainPages/Services");
    }

    public function courses()
    {
        return Inertia::render('MainPages/Courses', [
            'courses' => Course::with('professor')->where('state', 1)->get(),
            'url' => env('APP_URL'),
        ]);
    }
}
