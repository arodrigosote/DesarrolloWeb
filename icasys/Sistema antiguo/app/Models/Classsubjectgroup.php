<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classsubjectgroup extends Model
{
    use HasFactory;
    static $rules = [
		'nombre' => 'required',
		'descripcion' => 'required',
		'fecha' => 'required',
		'materia_tomada_id' => 'required',
		'grupo_id' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name','description','date','subjectgroup_id','group_id'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function studentclasssubject()
    {
        return $this->hasMany('App\Models\Studentclasssubject', 'class_subject_group_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function subjectgroup()
    {
        return $this->hasOne('App\Models\Subjectgroup', 'id', 'subjectgroup_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function group()
    {
        return $this->hasOne('App\Models\Group', 'id', 'group_id');
    }
}
