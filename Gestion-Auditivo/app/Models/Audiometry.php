<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Audiometry extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'patient_id',
        'date',
        'nivel_confort',
        'comments',
        'image',
    ];

    public function user()
    {
        return $this->hasOne('App\Models\User', 'id', 'user_id');
    }
    public function patient()
    {
        return $this->hasOne('App\Models\Patient', 'id', 'patient_id');
    }
}
