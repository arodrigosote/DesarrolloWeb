<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;
    static $rules = [
        'active' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['professor_id', 'schedule_id', 'active'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    // public function grupomaterias()
    // {
    //     return $this->hasMany('App\Models\Grupomateria', 'grupo_id', 'id');
    // }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function schedule()
    {
        return $this->hasOne('App\Models\Schedule', 'id', 'schedule_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function professor()
    {
        return $this->hasOne('App\Models\Professor', 'id', 'professor_id');
    }
}
