<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RefreshToken extends Model
{
    use HasFactory;

    protected $fillable=['expiry_date','token','user_id'];
    public $timestamps = false;
     // Specify the primary key column
     protected $primaryKey = 'user_id';

 
     public $incrementing = false;
}
