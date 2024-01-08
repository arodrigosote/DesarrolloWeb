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
        // $schedules = Schedule::all();
        // $schedules = Schedule::with('day', 'hour')->get();
        // $days = Day::select('id', 'name')->get();
        // // $days = Day::all();
        // $hours = DB::table('hours')->pluck('name', 'id')->toArray();
        // // $days = DB::table('days')->pluck('name', 'id')->toArray();
        // $days = new Schedules($days);
        // // return response()->json($schedules);

        // // dd($days);

        // return Inertia::render("Dashboard/Admin/Schedule/Index", compact(['schedules', 'days', 'hours']));
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
