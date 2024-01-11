<?php

namespace App\Http\Controllers;

use App\Http\Resources\DaysCollection;
use App\Http\Resources\Schedules;
use App\Models\Hour;
use Illuminate\Support\Facades\DB;
use App\Models\Schedule;
use App\Models\Day;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    //
    public function index()
    {
        return Inertia::render("Dashboard/Admin/Schedule/Index", [
            "schedules"=> Schedule::with('day', 'hour')->get(),
            "days"=> Day::all(),
            "hours"=> Hour::all()
        ]);
    }
    public function store(Request $request)
    {
        $schedule = Schedule::create();
        $schedule->day_id = $request->day_id;
        $schedule->hour_id = $request->hour_id;
        $schedule->save();

        return Inertia::render("Dashboard/Admin/Schedule/Index", [
            "schedules"=> Schedule::with('day', 'hour')->get(),
            "days"=> Day::all(),
            "hours"=> Hour::all()
        ]);
    }
    public function update(Request $request, $id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->day_id = $request->day_id;
        $schedule->hour_id = $request->hour_id;
        $schedule->save();

    }
    public function destroy($id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->delete();
    }
}
