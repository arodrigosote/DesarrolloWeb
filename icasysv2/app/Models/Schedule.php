<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    static $rules = [
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['dia_id','hora_id'];


    public function day(){
        return $this->hasOne("App\Models\Day","id","day_id");
    }

    public function hour(){
        return $this->hasOne("App\Models\Hour","id","hour_id");
    }
}
