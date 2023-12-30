<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('titulo')</title>

    <!-- Incluir los estilos de Bootstrap -->
    <link href="{{ asset('build/assets/app-041e359a.css') }}" rel="stylesheet">

    {{-- Estilos primarios --}}
    <link rel="stylesheet" href="{{ asset('css/main.css') }}">
</head>

<body>
    @yield('header')

    @yield('content')

    @yield('footer')

    <!-- Incluir los scripts de Bootstrap al final del body -->
    <script src="{{ asset('build/assets/app-cca32d8f.js') }}" defer></script>
</body>

</html>
