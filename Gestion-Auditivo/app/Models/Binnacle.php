<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Binnacle extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'branch_id',
        'date',
        'alias',
    ];
}
