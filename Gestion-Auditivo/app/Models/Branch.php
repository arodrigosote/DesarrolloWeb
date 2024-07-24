<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;


    static $rules = [
        "name"=> "required",
    ];

    protected $perPage = 20;

    protected $fillable = ['name', 'address', 'logo'];
}
