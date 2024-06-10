<div class="box box-info padding-1">
    <div class="box-body">
        
        <div class="form-group">
            {{ Form::label('alumno_id') }}
            {{ Form::text('alumno_id', $recibo->alumno_id, ['class' => 'form-control' . ($errors->has('alumno_id') ? ' is-invalid' : ''), 'placeholder' => 'Alumno Id']) }}
            {!! $errors->first('alumno_id', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('importe') }}
            {{ Form::text('importe', $recibo->importe, ['class' => 'form-control' . ($errors->has('importe') ? ' is-invalid' : ''), 'placeholder' => 'Importe']) }}
            {!! $errors->first('importe', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('fechaPago') }}
            {{ Form::text('fechaPago', $recibo->fechaPago, ['class' => 'form-control' . ($errors->has('fechaPago') ? ' is-invalid' : ''), 'placeholder' => 'Fechapago']) }}
            {!! $errors->first('fechaPago', '<div class="invalid-feedback">:message</div>') !!}
        </div>
        <div class="form-group">
            {{ Form::label('numeroSemanas') }}
            {{ Form::text('numeroSemanas', $recibo->numeroSemanas, ['class' => 'form-control' . ($errors->has('numeroSemanas') ? ' is-invalid' : ''), 'placeholder' => 'Numerosemanas']) }}
            {!! $errors->first('numeroSemanas', '<div class="invalid-feedback">:message</div>') !!}
        </div>

    </div>
    <div class="box-footer mt20">
        <button type="submit" class="btn btn-primary">{{ __('Submit') }}</button>
    </div>
</div>