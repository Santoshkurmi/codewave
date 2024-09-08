<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['user_id','content','view_count'];

    public  function votes(){
        
        return $this->hasMany(Vote::class,'voteable_id')->where('voteable_type','post');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
