<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;
    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['course_id','name','short_description'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    // public function clases()
    // {
    //     return $this->hasMany('App\Models\Clase', 'modulo_id', 'id');
    // }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function course()
    {
        return $this->hasOne('App\Models\Course', 'id', 'course_id');
    }
}
