<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Gate::define('isAdmin', function ($user) {
            return $user->role == 'admin';
        });

        Gate::define('isEmployee', function ($user) {
            return $user->role == 'employee';
        });

        Gate::define('isUser', function ($user) {
            return $user->role == 'user';
        });
    }
}
