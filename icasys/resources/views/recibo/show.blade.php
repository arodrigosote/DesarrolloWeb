@extends('layouts.app')

@section('template_title')
    {{ $recibo->name ?? "{{ __('Show') Recibo" }}
@endsection

@section('content')
    <section class="content container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="float-left">
                            <span class="card-title">{{ __('Show') }} Recibo</span>
                        </div>
                        <div class="float-right">
                            <a class="btn btn-primary" href="{{ route('recibos.index') }}"> {{ __('Back') }}</a>
                        </div>
                    </div>

                    <div class="card-body">
                        
                        <div class="form-group">
                            <strong>Alumno Id:</strong>
                            {{ $recibo->alumno_id }}
                        </div>
                        <div class="form-group">
                            <strong>Importe:</strong>
                            {{ $recibo->importe }}
                        </div>
                        <div class="form-group">
                            <strong>Fechapago:</strong>
                            {{ $recibo->fechaPago }}
                        </div>
                        <div class="form-group">
                            <strong>Numerosemanas:</strong>
                            {{ $recibo->numeroSemanas }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
