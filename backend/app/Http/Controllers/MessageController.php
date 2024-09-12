<?php

namespace App\Http\Controllers;

use App\Events\MessageReceivedEvent;
use App\Events\MessageSentEvent;
use App\Http\Requests\MessageGetRequest;
use App\Http\Requests\MessageRequest;
use App\Jobs\MessageJob;
use App\Models\Conversation;
use App\Models\ConversationUser;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{


    public function updateMessageSeen(Request $request){
        $receiver = $request->user_id;
        $owner = auth()->user()->id;

        

        $conversation = Conversation::findConversation($owner,$receiver);
        if($conversation){
            auth()->user()->conversations()->updateExistingPivot($conversation->id,[
                'last_message_seen'=> now()
            ]);
        }//
    }
    public function send(MessageRequest $request){
        $text = $request->text;
        $is_markdown = $request->is_markdown;
        $sender = auth()->user()->id;
        $receiver = $request->user_id;
        // $conversation_id = $request->conversation_id;
        if($receiver == $sender){
            return response()->json(['success'=>false,'errors'=>['default'=>'Sender and Receiver can"t be same']],400);
        }

        $conversation = Conversation::findConversation($sender,$receiver);

        if(!$conversation){
            $conversation = Conversation::create([]);//create new conversation

            ConversationUser::createNewConversationUsers($conversation->id,$sender,$receiver);
        }//if conversation is not found ,then create new one

        $message = Message::create(['is_markdown'=>$is_markdown,'text'=>$text,'user_id'=>$sender,'conversation_id'=>$conversation->id]);
        // broadcast(new MessageSentEvent($message,$receiver));
        MessageSentEvent::dispatch($message,$receiver);
        // MessageJob::dispatch($message,$receiver);

        return response()->json(['success'=>true,'data'=>$message,'msg'=>'Message is sent successfully']);

    }//send

    public function get(MessageGetRequest $request){

        $sender = auth()->user()->id;
        $user_id = $request->user_id;
        $lastMessageId = $request->last_message_id;
        $isAfter = $request->is_after || false;
        // $conversation_id = $request->conversation_id;
        if($user_id == $sender){
            return response()->json(['success'=>false,'errors'=>['default'=>'Please provide user id of other user not yourself']],400);
        }

        $conversation = Conversation::findConversation($sender,$user_id);

        if(!$conversation){
            $user = User::with("profile")->find($user_id);
            return response()->json(['success'=>true,'msg'=>'No Conversation Found','data'=>['user'=>$user,'messages'=>[]]]);
        }//if no conversation exists
        if(!$lastMessageId){
            $user = User::with("profile")->find($user_id);
            $messages = Message::where('conversation_id',$conversation->id)->orderByDesc('id')->limit(20)->get();
            $resData = ['user'=>$user,'messages'=>$messages];
            return response()->json(['success'=>true,'msg'=>'Fetched successfully','data'=>$resData]);
        }
        if($isAfter)
            $messages = Message::where('conversation_id',$conversation->id)->where('id','>',$lastMessageId)->orderByDesc('id')->limit(20)->get();
        else 
            $messages = Message::where('conversation_id',$conversation->id)->where('id','<',$lastMessageId)->orderByDesc('id')->limit(20)->get();
        
        $resData = ['messages'=>$messages];
        return response()->json(['success'=>true,'msg'=>'Fetched successfully','data'=>$resData]);
    
       
            // $messages["user"] = $user;
        // return response()->json(['success'=>true,'msg'=>'Fetched successfully','data'=>$resData]);

    }//get
}
