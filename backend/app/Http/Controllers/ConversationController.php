<?php

namespace App\Http\Controllers;

use App\Models\ConversationUser;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    //

    public function getConversations(Request $request){
        $user_id = auth()->user()->id;
        $convers = ConversationUser::where('conversation_users.user_id',$user_id)->where('cu1.user_id','!=',$user_id)->join('conversation_users as cu1','conversation_users.conversation_id','=','cu1.conversation_id')->select('cu1.user_id','conversation_users.conversation_id')->with('user')->get();
        // $convers = ConversationUser::where('user_id',$user_id)->with('user')->with('conversation')->get();
        return response()->json(['success'=>true,'msg'=>'Fetched successfully','data'=>$convers]);
    }//get conversations
}
