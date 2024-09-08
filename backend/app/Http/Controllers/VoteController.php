<?php

namespace App\Http\Controllers;

use App\Models\Vote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function vote(Request $request){

        $post_id = $request->post_id;
        $answer_id = $request->answer_id;
        $user_id = auth()->user()->id;
        $vote_type = $request->vote_type;

        if(!($post_id || $answer_id ) ){
            return response()->json(['errors'=>['default'=>'Either post_id or answer_id is required']],400);
        }//

        if( !($vote_type ==-1 || $vote_type==1) ){
            return response()->json(['errors'=>['vote_type'=>'Please provide proper vote_type']],400);
        }

        if($post_id){
            $voteable_type = "post";
            $id = $post_id;
        }
        else {
            $voteable_type = "answer";
            $id = $answer_id;
        }


        $vote = Vote::where(['voteable_id'=>$id,'voteable_type'=>$voteable_type,'user_id'=>$user_id])->first();
        
        if($vote){
            if($vote->type== $vote_type){
                $isDeleted = $vote->delete();
                if($isDeleted) return response()->json(['data'=>[]]);
                else return response()->json([],400);
            }//
            else{
                $vote->type = $vote_type;
                $isSaved = $vote->save();
                if($isSaved) return response()->json(['data'=>[]]);
                else return response()->json([],400);
            }
        }//vote already exists

  
        $vote = Vote::create(['user_id'=>$user_id,'voteable_type'=>$voteable_type,'voteable_id'=>$id,'type'=>$vote_type]);
        if($vote) return response()->json(['success'=>true,'data'=>[]]);
        else return response()->json(['errors'=>['default'=>"Something went wrong creating votes"]],400);

      
    }//vote

    
}