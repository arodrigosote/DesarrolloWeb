<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //


        Gate::define('isAdmin', function ($user) {
            return $user->rol == 2; // Ejemplo: el usuario tiene un atributo 'rol' igual a 2 para ser considerado administrador.
        });

        Gate::define('isProfessor', function ($user) {
            return $user->rol == 1; // Ejemplo: el usuario tiene un atributo 'rol' igual a 2 para ser considerado administrador.
        });

        Gate::define('isUser', function ($user) {
            return $user->rol == 0; // Ejemplo: el usuario tiene un atributo 'rol' igual a 2 para ser considerado administrador.
        });

        // Gate::define('alumno', function ($user) {
        //     $alumno = Al::where('user_id', $user->id)->get(); // Ejecutar la consulta y obtener resultados

        //     if ($alumno->isEmpty() && $user->rol != 0) {
        //         return false; // No se encontraron resultados y el rol del usuario no es 0
        //     } else {
        //         return true; // Se encontraron resultados o el rol del usuario es 0
        //     }

        // });
    }
}
