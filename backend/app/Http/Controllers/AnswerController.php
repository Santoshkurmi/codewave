<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller
{

    public function postAnswer(Request $request){
        $user_id = auth()->user()->id;
        $post_id = $request->post_id;
        $markdown = $request->markdown;

        $answer = Answer::create(['user_id'=>$user_id,'post_id'=>$post_id,'markdown'=>$markdown]);

        return response()->json(['data'=>$answer]);
    }//
    
}
