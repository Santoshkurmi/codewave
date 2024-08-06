<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\ConversationUser;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function send(Request $request){
        $request->validate([
            'text'=>'required|min:1',
            'receiver'=>'required|exists:users,id'
        //     'conversation_id'=>'required|exists:conversations,id'
        ]);
        $text = $request->text;
        $sender = auth()->user()->id;
        $receiver = $request->receiver;
        // $conversation_id = $request->conversation_id;
        if($receiver == $sender){
            return response()->json(['success'=>false,'errors'=>['default'=>'Sender and Receiver can"t be same']]);
        }

        $conversation = Conversation::join('conversation_users as cu1','conversations.id','=','cu1.conversation_id')
                    ->join('conversation_users as cu2','conversations.id','=','cu2.conversation_id')
                    ->where('cu1.user_id',$sender)
                    ->where('cu2.user_id',$receiver)
                    ->select('conversations.id')
                    ->first();// check if the conversation between two user already exists

        if(!$conversation){
            $conversation = Conversation::create([]);//create new conversation

            ConversationUser::insert([
                ['conversation_id'=>$conversation->id,'user_id'=>$sender],
                ['conversation_id'=>$conversation->id,'user_id'=>$receiver],
            ]);//add the users for that conversation in conversation_users table
        }//if conversation is not found ,then create new one

        $message = Message::create(['text'=>$text,'user_id'=>$sender,'conversation_id'=>$conversation->id]);

        return response()->json(['success'=>true,'data'=>$message,'msg'=>'Message is sent successfully']);

    }//send

    public function get(Request $request){
        $request->validate([
            'user_id'=>'required|exists:users,id'
        ]);

        $sender = auth()->user()->id;
        $user_id = $request->user_id;
        // $conversation_id = $request->conversation_id;
        if($user_id == $sender){
            return response()->json(['success'=>false,'errors'=>['default'=>'Please provide user id of other user not yourself']]);
        }

        $conversation = Conversation::join('conversation_users as cu1','conversations.id','=','cu1.conversation_id')
                    ->join('conversation_users as cu2','conversations.id','=','cu2.conversation_id')
                    ->where('cu1.user_id',$request->user_id)
                    ->where('cu2.user_id',auth()->user()->id)
                    ->select('conversations.id')
                    ->first();// check if the conversation between two user already exists
        if(!$conversation){
            return response()->json(['success'=>true,'msg'=>'No Conversation Found','data'=>[]]);
        }//if no conversation exists
        $messages = Message::where('conversation_id',$conversation->id)->get();
        return response()->json(['success'=>true,'msg'=>'Fetched successfully','data'=>$messages]);

    }//get
}
