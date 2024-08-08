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
}
