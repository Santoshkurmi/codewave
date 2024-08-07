<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConversationUser extends Model
{
    use HasFactory;
    protected $fillable =['conversation_id','user_id'];

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }
    public function conversation(){
        return $this->belongsTo(Conversation::class,'conversation_id');
    }

    public static function createNewConversationUsers($conversation_id,$user1_id,$user2_id){

            return ConversationUser::insert([
                ['conversation_id'=>$conversation_id,'user_id'=>$user1_id],
                ['conversation_id'=>$conversation_id,'user_id'=>$user2_id],
            ]);//add the users for that conversation in conversation_users table
    }//

}
