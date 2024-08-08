<?php

namespace App\Http\Controllers;

use App\Models\Binnacle;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;

class BinnacleController extends Controller
{
    public function index()
    {
        if (Gate::allows("isAdmin")) {
            $user = auth()->user();

            // Depuración: Verifica si el usuario está autenticado
            if (!$user) {
                return redirect()->route('login')->with('toast', [
                    'mensaje' => 'Por favor, inicie sesión.',
                    'tipo' => 'error',
                ]);
            }

            // Depuración: Verifica si el usuario tiene una branch_id
            if (!isset($user->branch_id)) {
                return Inertia::render("Dashboard")->with('toast', [
                    'mensaje' => 'No se encontró la sucursal del usuario.',
                    'tipo' => 'error',
                ]);
            }

            $binnacle = Binnacle::whereDate('date', now()->toDateString())
                ->where('branch_id', $user->branch_id)
                ->first();

                $patients = Patient::where('branch_id', $user->branch_id)->get();

            return Inertia::render('Binnacle/Index', [
                'binnacle' => $binnacle,
                'patients' => $patients,
            ]);
        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }

    public function store(Request $request){
        if (Gate::allows("isAdmin")) {
            $user = auth()->user();

            $binnacle = Binnacle::create([
                'user_id' => $user->id,
                'branch_id' => $user->branch_id,
                'date' => now()->toDateString(),
            ]);

            if($request->alias){
                $binnacle->alias = $request->alias;
            }

            $binnacle->save();


        } else {
            return Inertia::render("Dashboard")->with('toast', [
                'mensaje' => 'No estás autorizado.',
                'tipo' => 'error',
            ]);
        }
    }
}

