<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Studentpayment extends Model
{
    use HasFactory;
    protected $fillable = ['student_id','payment_day','week_topay_date','week_topay_number','receipt_id'];

    public function student()
    {
        return $this->hasOne('App\Models\Student', 'id', 'student_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function receipt()
    {
        return $this->hasOne('App\Models\Receipt', 'id', 'receipt_id');
    }
}
