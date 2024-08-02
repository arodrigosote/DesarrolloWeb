<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Receipt;
use App\Models\Receiptpool;
use App\Models\Subject;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class GenerateController extends Controller
{
    public function index_receipts(){
        return Inertia::render("Dashboard/Admin/Generate/Receipts",[
            'receipts' => Receiptpool::with('receipt', 'receipt.student', 'receipt.student.group', 'receipt.studentpayments',  'receipt.student.group.schedule', 'receipt.student.group.schedule.day', 'receipt.student.group.schedule.hour')->get(),
        ]);
    }
    public function delete_receipts($id){
        if (Gate::allows("isAdmin")) {
            $receipt = Receiptpool::find($id);
            $receipt->delete();
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }
    public function truncate($id){
        if (Gate::allows("isAdmin")) {
            Receiptpool::truncate();
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function index(){
        if (Gate::allows("isAdmin")) {
            return Inertia::render('Dashboard/Admin/Generate/Index');
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function assistance_list(){
        if (Gate::allows("isAdmin")) {
            return Inertia::render('Dashboard/Admin/Generate/Assistance',[
                'groups' => Group::with('professor', 'schedule.day', 'schedule.hour')->get(),
                'subjects' => Subject::all(),
            ]);
        } else {
            return Inertia::render("Dashboard/Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }
}
