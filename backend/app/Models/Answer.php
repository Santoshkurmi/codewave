<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'user_id',
        'markdown'
    ]; 

    public  function votes(){
        
        return $this->hasMany(Vote::class,'voteable_id')->where('voteable_type','answer');
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
