<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','content','view_count'];

    public  function Votes(){
        return $this->hasMany(Vote::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
