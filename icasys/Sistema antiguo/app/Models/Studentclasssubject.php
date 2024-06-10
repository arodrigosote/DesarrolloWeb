<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Studentclasssubject extends Model
{
    use HasFactory;
    static $rules = [
		'student_id' => 'required',
		'class_subject_group_id' => 'required',
		'attendance' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['student_id','class_subject_group_id','attendance','grade','note'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function student()
    {
        return $this->hasOne('App\Models\Student', 'id', 'student_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function classsubjectgroup()
    {
        return $this->hasOne('App\Models\Classsubjectgroup', 'id', 'class_subject_group_id');
    }
}
