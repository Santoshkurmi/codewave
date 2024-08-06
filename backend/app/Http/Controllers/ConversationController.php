<?php

namespace App\Http\Controllers;

use App\Models\ConversationUser;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    //

    public function getConversations(Request $request){
        $user_id = auth()->user()->id;
        $convers = ConversationUser::where('user_id',$user_id)->with('user')->with('conversation')->get();
        return response()->json(['success'=>true,'msg'=>'Fetched successfully','data'=>$convers]);
    }//get conversations
}
