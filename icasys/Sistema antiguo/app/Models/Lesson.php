<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;
    static $rules = [
		'modulo_id' => 'required',
		'numeroLeccion' => 'required',
		'nombre' => 'required',
		'contenido' => 'required',
		'contenidoHoras' => 'required',
		'contenidoMinutos' => 'required',
		'enlaceRecursos' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['module_id','lesson_number','name','content','content_houres','content_minutes','resources_url','image','video'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function module()
    {
        return $this->hasOne('App\Models\Module', 'id', 'module_id');
    }
}
