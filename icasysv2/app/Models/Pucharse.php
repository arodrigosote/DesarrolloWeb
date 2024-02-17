<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pucharse extends Model
{
    use HasFactory;
    static $rules = [
		'course_id' => 'required',
		'amount' => 'required',
		'state' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id','course_id','amount','state'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function course()
    {
        return $this->hasOne('App\Models\Course', 'id', 'course_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne('App\Models\User', 'id', 'user_id');
    }
}
