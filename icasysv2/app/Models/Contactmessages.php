<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contactmessages extends Model
{
    use HasFactory;

    static $rules = [
        "name"=> "required",
        "email"=> "required",
        "subject"=> "required",
        "content"=> "required",
    ];

    protected $perPage = 20;

    protected $fillable = ['name', 'email', 'content', 'subject'];
}
