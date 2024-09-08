<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    

    public function postComment(Request $request){
        $user_id = auth()->user()->id;
        $answer_id = $request->answer_id;
        $content = $request->content;

        $comment = Comment::create(['user_id'=>$user_id,'answer_id'=>$answer_id,'content'=>$content]);

        return response()->json(['data'=>$comment]);
    }//
}
