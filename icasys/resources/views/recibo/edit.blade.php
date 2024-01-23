@extends('layouts.app')

@section('template_title')
    {{ __('Update') }} Recibo
@endsection

@section('content')
    <section class="content container espacioArriba">
        <div class="">
            <div class="col-md-12">

                @includeif('partials.errors')

                <div class="card card-default">
                    <div class="card-header">
                        <span class="card-title">{{ __('Update') }} Recibo</span>
                    </div>
                    <div class="card-body">
                        <form method="POST" action="{{ route('recibos.update', $recibo->id) }}"  role="form" enctype="multipart/form-data">
                            {{ method_field('PATCH') }}
                            @csrf

                            @include('recibo.form')

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
