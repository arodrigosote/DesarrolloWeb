<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    static $rules = [
        'user_id' => 'required',
        "name"=> "required",
    ];

    protected $perPage = 20;

    protected $fillable = ['user_id', 'name', 'address', 'phone', 'age', 'gender', 'publicity_method', 'ailments', 'background', 'email'];
}
