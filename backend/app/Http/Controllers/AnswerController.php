<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Notification;
use App\Models\Post;
use Illuminate\Http\Request;

class AnswerController extends Controller
{

    public function postAnswer(Request $request){
        $user_id = auth()->user()->id;
        $post_id = $request->post_id;
        $markdown = $request->markdown;


        $answer = Answer::create(['user_id'=>$user_id,'post_id'=>$post_id,'markdown'=>$markdown]);

            $post = Post::where('id',$post_id)->first();
            $noti_user_id = $post->user_id;
            $noti_name = auth()->user()->name;
            $content = $noti_name.' has answered your post';
            if($noti_user_id != auth()->user()->id)
            Notification::create(['user_id'=>$noti_user_id,'content'=>$content,'url'=>"/post/".$post_id]);

        return response()->json(['data'=>$answer]);
    }//
    
}
