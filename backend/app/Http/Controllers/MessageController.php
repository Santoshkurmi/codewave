<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageGetRequest;
use App\Http\Requests\MessageRequest;
use App\Models\Conversation;
use App\Models\ConversationUser;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function send(MessageRequest $request){
        $text = $request->text;
        $sender = auth()->user()->id;
        $receiver = $request->user_id;
        // $conversation_id = $request->conversation_id;
        if($receiver == $sender){
            return response()->json(['success'=>false,'errors'=>['default'=>'Sender and Receiver can"t be same']]);
        }

        $conversation = Conversation::findConversation($sender,$receiver);

        if(!$conversation){
            $conversation = Conversation::create([]);//create new conversation

            ConversationUser::createNewConversationUsers($conversation->id,$sender,$receiver);
        }//if conversation is not found ,then create new one

        $message = Message::create(['text'=>$text,'user_id'=>$sender,'conversation_id'=>$conversation->id]);

        return response()->json(['success'=>true,'data'=>$message,'msg'=>'Message is sent successfully']);

    }//send

    public function get(MessageGetRequest $request){

        $sender = auth()->user()->id;
        $user_id = $request->user_id;
        // $conversation_id = $request->conversation_id;
        if($user_id == $sender){
            return response()->json(['success'=>false,'errors'=>['default'=>'Please provide user id of other user not yourself']]);
        }

        $conversation = Conversation::findConversation($sender,$user_id);
        $user = User::find($user_id);

        if(!$conversation){
            return response()->json(['success'=>true,'msg'=>'No Conversation Found','data'=>['user'=>$user,'messages'=>[]]]);
        }//if no conversation exists
        $messages = Message::where('conversation_id',$conversation->id)->get();
        $resData = ['user'=>$user,'messages'=>$messages];
        // $messages["user"] = $user;
        return response()->json(['success'=>true,'msg'=>'Fetched successfully','data'=>$resData]);

    }//get
}
