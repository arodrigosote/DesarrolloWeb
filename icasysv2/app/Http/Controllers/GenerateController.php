<?php

namespace App\Http\Controllers;

use App\Models\Receipt;
use App\Models\Receiptpool;
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
}
