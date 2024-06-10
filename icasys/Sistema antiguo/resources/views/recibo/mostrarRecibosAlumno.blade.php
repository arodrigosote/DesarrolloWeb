@extends('layouts.escritorio')

@section('title', 'Mostrar Recibos Alumno')

@php
    $recibosReversed = $recibos->reverse();
@endphp

@section('content')
    <div class="container espacioArriba">
        <div class="row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-header">
                        <div style="display: flex; justify-content: space-between; align-items: center;">

                            <span id="card_title">
                                {{ __('Recibos:') }} {{$alumno->nombre}}
                            </span>

                             <div class="float-right">
                                {{-- <a href="{{ route('recibos.create') }}" class="btn btn-primary btn-sm float-right"  data-placement="left">
                                  {{ __('Create New') }}
                                </a> --}}
                              </div>
                        </div>
                    </div>
                    @if ($message = Session::get('success'))
                        <div class="alert alert-success">
                            <p>{{ $message }}</p>
                        </div>
                    @endif

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead class="thead">
                                    <tr>
                                        {{-- <th>No</th> --}}
                                        
										{{-- <th>Alumno Id</th> --}}
										<th>Importe</th>
										<th>Fechapago</th>
										<th>Numerosemanas</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($recibosReversed as $recibo)
                                        <tr>
                                            {{-- <td>{{ ++$i }}</td> --}}
                                            
											{{-- <td>{{ $recibo->alumno_id }}</td> --}}
											<td>{{ $recibo->importe }}</td>
											<td>{{ $recibo->fechaPago }}</td>
											<td>{{ $recibo->numeroSemanas }}</td>

                                            <td>
                                                <form action="{{ route('generarRecibo',$recibo->id) }}" method="GET">
                                                    {{-- <a class="btn btn-sm btn-primary " href="{{ route('recibos.show',$recibo->id) }}"><i class="fa fa-fw fa-eye"></i> {{ __('Show') }}</a>
                                                    <a class="btn btn-sm btn-success" href="{{ route('recibos.edit',$recibo->id) }}"><i class="fa fa-fw fa-edit"></i> {{ __('Edit') }}</a> --}}
                                                    @csrf
                                                    <a class="btn btn-sm btn-success" href="{{ route('generarRecibo',['id'=> $recibo->id]) }}"><i class="fa fa-fw fa-edit"></i> {{ __('Descargar') }}</a>
                                                    {{-- <button type="submit" class="btn btn-success btn-sm"><i class="ri-download-fill"></i> Descargar</button> --}}
                                                </form>
                                            </td>
                                        </tr>
                                    @endforeach
                                    {{ $recibos->links() }}
                                </tbody>
                                
                            </table>
                        </div>
                    </div>
                </div>
                {!! $recibos->links() !!}
            </div>
        </div>
    </div>
@endsection
