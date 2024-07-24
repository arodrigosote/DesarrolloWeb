<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receiptpool extends Model
{
    use HasFactory;

    protected $fillable = ['receipt_id'];


    public function receipt()
    {
        return $this->hasOne('App\Models\Receipt', 'id', 'receipt_id');
    }
}
