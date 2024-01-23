<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Recibo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">

    <style>
        .noEspacio {
            margin: 0;
            padding: 0;
        }

        .borde {
            border: black 1px solid;
        }

        .ancho {
            width: 75%;
        }

        th.columna-concepto {
            width: 80%;
        }

        th.columna-vacia {
            width: 5%;
        }

        th.columna-vacia2 {
            width: 10%;
        }

        .p0 {
            margin: 0;
            font-size: 9;
            line-height: 1;
            padding: 0;
        }

        .textoChico {
            font-size: 9;
        }

        .textoSuperChico{
            font-size: 7;
        }

        .mayus {
            text-transform: uppercase;
        }
    </style>
</head>
{{-- <link rel="stylesheet" href="{{public_path('css/recibo.css')}}"> --}}


<body>

    @php
        $numeroSemanas = count($payments);
        function numeroEnTexto($numero)
        {
            $unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
            $decenas = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
            $centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

            if ($numero >= 0 && $numero <= 9) {
                return $unidades[$numero];
            } elseif ($numero >= 10 && $numero <= 19) {
                return $decenas[$numero - 10];
            } elseif ($numero >= 20 && $numero <= 99) {
                $decena = floor($numero / 10);
                $unidad = $numero % 10;
                $texto = $decenas[$decena];
                if ($unidad > 0) {
                    $texto .= ' y ' . $unidades[$unidad];
                }
                return $texto;
            } elseif ($numero >= 100 && $numero <= 999) {
                $centena = floor($numero / 100);
                $resto = $numero % 100;
                $texto = $centenas[$centena];
                if ($resto > 0) {
                    $texto .= ' ' . numeroEnTexto($resto);
                }
                return $texto;
            }

            return 'Número fuera de rango';
        }

        $importe = $receipt->amount;
        $importeEnTexto = numeroEnTexto($importe);

        // echo $numeroEnTexto; // Imprime: "doce mil trescientos cuarenta y cinco"

    @endphp

    <div class="contenedor text-center">

        <table style="margin-bottom: 0%; padding-bottom:0%" class="">
            <thead>
                <th style="width: 25%"></th>
                <th style="width: 50%"></th>
                <th style="width: 25%"></th>
            </thead>
            <tbody>
                <td> <img src="" style="width: 100%" class="imgSec"
                        alt="secretaria de educacion guerrero"></td>
                <td>
                    <div class="text-center letra">
                        <p class="p0">INSTITUTO DE COMPUTACIÓN ACTUALIZADA</p>
                        <P class="p0">Poder Ejecutivo del Estado</P>
                        <p class="p0">Secretaría de Educación Guerrero</p>
                        <p class="p0">Subsecretaría de Planeación Educativa</p>
                        <p class="p0">Dirección de Seguimiento Control y Evaluación</p>
                        <p class="p0">Departamento de Revalidación de Estudios e</p>
                        <p class="p0">Incoorporación de Escuelas</p>
                        <p class="p0">CLAVE DE INCOORPORACIÓN 12PBT0233H</p>
                    </div>
                </td>
                <td><img src="" style="width: 100%" class="imgIca"
                        alt="icasys logo"></td>
            </tbody>
        </table>

        <table class="mt-2" width="100%">
            <thead class="">
                <th colspan="2" class="borde text-center" width="68%">DATOS DEL ALUMNO:</th>
                <th width="2%"></th>
                <th class="borde text-center" width="15%">FOLIO:</th>
                <th class="borde text-center" width="15%"> {{ $receipt->id }}</th>
            </thead>
            <tbody>
                <tr class="ancho">
                    <td class="text-center borde" rowspan="3" colspan="2">{{ $receipt->student->name }}</td>
                    <td></td>
                    <td class="noEspacio text-center borde textoChico" colspan="2">LUGAR DE EXPEDICIÓN</td>
                </tr>
                <tr>
                    {{-- <td><strong>Horario</strong></td> --}}
                    <td></td>
                    <td class="noEspacio text-center borde textoChico" colspan="2">TAXCO DE ALARCÓN</td>
                </tr>
                <tr>
                    {{-- <td>{{$recibo->alumno->grupo->horario->dia->nombre}} {{$recibo->alumno->grupo->horario->hora->nombre}}</td> --}}
                    <td></td>
                    <td class="noEspacio text-center borde textoChico" colspan="2">PLAZUELA DEL TORIL 4</td>
                </tr>
                <tr>
                    <td class="text-center borde" colspan="2"><strong>Horario</strong></td>
                    <td></td>
                    <td class="noEspacio text-center borde" colspan="2"><strong>FECHA:</strong></td>
                </tr>
                <tr>
                    <td class="borde text-center">{{ $receipt->student->group->schedule->day->name }}</td>
                    <td class="borde text-center"> {{ $receipt->student->group->schedule->hour->name }}</td>
                    <td></td>
                    <td class="noEspacio text-center borde" colspan="2"><strong>{{ $receipt->date_payment }}</strong>
                    </td>
                </tr>
                <tr>
                    <td class="text-center " colspan="2" height="2%"></td>
                    <td></td>
                    <td class="noEspacio text-center " colspan="2"></td>
                </tr>
                <tr>
                    <td class="text-center borde" colspan="2"><strong>CONCEPTO:</strong></td>
                    <td></td>
                    <td class="noEspacio text-center borde" colspan="2"></td>
                </tr>
                <tr>
                    <td class="text-center borde" rowspan="2" colspan="2">Colegiatura correspondiente a semana:
                        @foreach ($payments as $payment)
                            {{ $payment->week_topay_number+1 }} - {{ $payment->week_topay_date }} ,
                        @endforeach de clases.
                    </td>
                    <td></td>
                    <td class="noEspacio text-center borde" colspan="2">${{ $receipt->amount }}.00</td>
                </tr>
                <tr>
                    <td></td>
                    <td class="noEspacio text-center borde textoChico mayus" colspan="2">{{ $importeEnTexto }}
                        00/100</td>
                </tr>

            </tbody>
        </table>

        <p class="textoChico" style="margin: 0%; padding: 5px">CONTACTO - TEL: 627-15-22 CORREO: contacto@icasys.mx</p>

        <p class="textoSuperChico" style="margin: 0%; padding-bottom: 5px">para cualquier duda o aclaración favor de presentarse en nuestras Instalaciones en horario de oficina, donde
            con gusto le atenderemos.
        </p>

        <img src="" style="width: 100%; margin: 0%" class="imgSec" alt="banner">

    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous">
    </script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
</body>

</html>
