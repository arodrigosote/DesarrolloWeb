<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Locations extends Model
{
    use HasFactory;

    static $rules = [
		'location' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['location'];

    public function alumnos()
    {
        return $this->hasMany('App\Models\Alumno', 'localidad_id', 'id');
    }
}
