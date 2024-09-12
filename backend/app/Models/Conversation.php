<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasFactory;

    protected $fillable =['title','profile','isGroup'];

    public function messages(){
        return $this->hasMany(Message::class);
    }//

    public function lastMessage()
    {
        return $this->hasOne(Message::class)->latest('created_at');
    }

    public static function findConversation($user1_id,$user2_id){

        $conversation = Conversation::join('conversation_users as cu1','conversations.id','=','cu1.conversation_id')
                    ->join('conversation_users as cu2','conversations.id','=','cu2.conversation_id')
                    ->where('cu1.user_id',$user1_id)
                    ->where('cu2.user_id',$user2_id)
                    ->select('conversations.id')
                    ->first();// check if the conversation between two user already exists
        return $conversation;
    }//findConversation



    public function users(){
       return $this->belongsToMany(User::class,'conversation_users')->withPivotValue('last_message_seen'); 
    }
}
