<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

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
        //
        Gate::define('isAdmin', function ($user) {
            return $user->role == 'admin';
        });

        Gate::define('isWorker', function ($user) {
            return $user->role == 'worker';
        });

        Gate::define('isUser', function ($user) {
            return $user->role == 'user';
        });
    }
}
