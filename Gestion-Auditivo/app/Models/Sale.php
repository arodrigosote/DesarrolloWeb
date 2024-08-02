<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'patient_id',
        'guarranty_id',
        'amount',
        'time',
        'details',
    ];

    public function patient()
    {
        return $this->hasOne('App\Models\Patient', 'id', 'patient_id');
    }
    public function product()
    {
        return $this->hasOne('App\Models\Product', 'id', 'product_id');
    }
    public function guarranty()
    {
        return $this->hasOne('App\Models\Guarranty', 'id', 'guarranty_id');
    }

}
