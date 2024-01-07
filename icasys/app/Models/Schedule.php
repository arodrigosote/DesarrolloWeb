<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;



    public function day(){
        return $this->hasOne("App\Models\Day","id","day_id");
    }

    public function hour(){
        return $this->hasOne("App\Models\Hour","id","hour_id");
    }
}
