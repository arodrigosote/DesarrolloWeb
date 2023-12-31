<link rel="stylesheet" href="{{ asset('css/header/header.css') }}">
<header>
    <div class="header-top">
        <div class="left-section">
            <p class="p-2">Este es un mensaje de la pagina</p>
        </div>
        <div class="right-section">

        </div>
    </div>

    <div class="header-middle">
        <div class="left-section-middle">


        </div>
        <div class="middle-section-middle">
            <h1>Taxcolors</h1>
        </div>
        <div class="right-section-middle">

        </div>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            {{-- <a class="navbar-brand" href="#">Navbar</a> --}}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item"><a href="#" class="btn btn-light">Inicio</a></li>
                    <li class="nav-item dropdown-center">
                        <button class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Collares
                        </button>
                        <ul class="dropdown-menu dropdown-menu-light">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown-center">
                        <button class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Explora
                        </button>
                        <ul class="dropdown-menu dropdown-menu-light">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown-center">
                        <button class="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Anillos
                        </button>
                        <ul class="dropdown-menu dropdown-menu-light">
                            <li><a class="dropdown-item" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</header>
