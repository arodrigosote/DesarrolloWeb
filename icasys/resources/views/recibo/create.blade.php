@extends('layouts.app')

@section('template_title')
    {{ __('Create') }} Recibo
@endsection

@section('content')
    <section class="content container espacioArriba">
        <div class="row">
            <div class="col-md-12">

                @includeif('partials.errors')

                <div class="card card-default">
                    <div class="card-header">
                        <span class="card-title">{{ __('Create') }} Recibo</span>
                    </div>
                    <div class="card-body">
                        <form method="POST" action="{{ route('recibos.store') }}"  role="form" enctype="multipart/form-data">
                            @csrf

                            @include('recibo.form')

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
