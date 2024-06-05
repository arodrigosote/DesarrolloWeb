<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyCsrfToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

     protected $except = [
        'stripe/*',
        'http://example.com/foo/bar',
        'http://example.com/foo/*',
        'https://whatsapp.nuvinuriel.com/*',
        'https://whatsapp.nuvinuriel.com/reserva/*',
        'https://whatsapp.nuvinuriel.com/reserva',
        'https://5abc-2806-104e-4-2149-31bf-5561-868-a2dc.ngrok-free.app/reserva',
        'https://5abc-2806-104e-4-2149-31bf-5561-868-a2dc.ngrok-free.app/*',
        'api/enviar-datos',
        '/reserva'
    ];

    public function handle(Request $request, Closure $next): Response
    {
        return $next($request);
    }


}
