<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    use HasFactory;

    static $rules = [
		'name' => 'required',
		'email' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['name','email','phone','skill','career','biography','facebook_url','github_url','x_url','linkedin_url','web_url','picture'];

    public function groups()
    {
        return $this->hasOne('App\Models\Group', 'professor_id', 'id');
    }
}
