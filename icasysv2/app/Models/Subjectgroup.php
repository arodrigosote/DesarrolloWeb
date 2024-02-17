<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subjectgroup extends Model
{
    use HasFactory;
    static $rules = [
		'group_id' => 'required',
		'subject_id' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['group_id','subject_id','start_date','finish_date'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function clasePs()
    {
        return $this->hasMany('App\Models\ClaseP', 'materia_tomada_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function group()
    {
        return $this->hasOne('App\Models\Group', 'id', 'group_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function subject()
    {
        return $this->hasOne('App\Models\Subject', 'id', 'subject_id');
    }

}
