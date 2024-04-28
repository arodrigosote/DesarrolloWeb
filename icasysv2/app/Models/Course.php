<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    static $rules = [
		'title' => 'required',
		'description' => 'required',
		'short_description' => 'required',
		'state' => 'required',
		'price' => 'required',
		'houres' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['title','description','short_description','slug','difficulty_id','professor_id','category_id','state','price','target_learning','target_audience','houres','files_included','requirements','image','video'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function coursecategory()
    {
        return $this->hasOne('App\Models\Coursecategory', 'id', 'category_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function coursedifficulty()
    {
        return $this->hasOne('App\Models\Coursedifficulty', 'id', 'difficulty_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function professor()
    {
        return $this->hasOne('App\Models\Professor', 'id', 'professor_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function modules()
    {
        return $this->hasMany('App\Models\Module', 'course_id', 'id');
    }
}
