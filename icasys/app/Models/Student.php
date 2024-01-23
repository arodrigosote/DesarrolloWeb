<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    static $rules = [
		'name' => 'required',
		'active' => 'required',
		'email' => 'required',
    ];
    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name','group_id','active','address','postal_code','phone','user_id','email','school_cycle','grade_id','activity_id','location_id','inscription_id','birthday','firstday','curp','tutor_id','occupation','tuition','profile_pic','credential_pic'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function activity()
    {
        return $this->hasOne('App\Models\Activity', 'id', 'activity_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function clasePTomadas()
    {
        return $this->hasMany('App\Models\ClasePTomada', 'alumno_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function grade()
    {
        return $this->hasOne('App\Models\Grade', 'id', 'grade_id');
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
    public function location()
    {
        return $this->hasOne('App\Models\Locations', 'id', 'location_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function pagos()
    {
        return $this->hasMany('App\Models\Pago', 'alumno_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function receipts()
    {
        return $this->hasMany('App\Models\Receipt', 'student_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne('App\Models\User', 'id', 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function inscription()
    {
        return $this->hasOne('App\Models\Inscription', 'id', 'inscription_id');
    }
    public function tutor()
    {
        return $this->hasOne('App\Models\Tutor', 'id', 'tutor_id');
    }
}
