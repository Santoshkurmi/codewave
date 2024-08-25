<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Vote;
use Illuminate\Http\Request;
use Response;

class PostController extends Controller
{
    public function create(Request $request){

       $content = $request->content;
       $user_id = auth()->user()->id; 
       if(!$content || strlen($content)<10){
            return response()->json(['errors'=>['content'=>'Post must be more than 10 chars longs']],400);
       }//if error

       $post = Post::create(['user_id'=>$user_id,'content'=>$content]);
       if(!$post){
            return response()->json(['success'=>false,'errors'=>['default'=>'Something went wrong creating the post,Please try again']],400);
       }

       return response()->json(['success'=>false,'data'=>$post]);

    }//create post

    public function update(Request $request){

        $content = $request->content;
        $post_id = $request->post_id;
        $user_id = auth()->user()->id; 
        if(!$content || strlen($content)<10){
             return response()->json(['errors'=>['content'=>'Post must be more than 10 chars longs']],400);
        }//if error
 
        $isUpdated = Post::where('id',$post_id)->where('user_id',$user_id)->update(['content'=>$content]);
        if(!$isUpdated){
             return response()->json(['success'=>false,'errors'=>['default'=>'Something went wrong Updating the post,Please try again']],400);
        }
 
        return response()->json(['success'=>false,'data'=>[] ]);
 
     }//create post

    public function delete(Request $request){
        $post_id =$request->post_id;
        $user_id = auth()->user()->id;

        $isDeleted = Post::where('id',$post_id)->where('user_id',$user_id)->delete();
        if(!$isDeleted){
            return response()->json(['errors'=>['default'=>'Either post not exist or you have not permission to do so.']],400);
        }
        else return response()->json(['success'=>true,'msg'=>'Deleted the post','data'=>[]]);
    }//delete

    

    public function get(Request $request){
        // $user_id = auth()->user()->id;
        $user_id = $request->user_id;
        $post_id = $request->post_id;

        if($post_id){

            $post = Post::withCount([
                'votes as up_count'=>function ($query){
                    $query->where('type','1');
                },
                'votes as down_count'=>function ($query){
                    $query->where('type','-1');
                },
            ])->orderBy('created_at','desc')->where('id',$post_id)->with('user')->with('user.profile')->first();
            if(!$post){
               return response()->json(['errors'=>['default'=>'The post is not found']],400);
            }

            return response()->json(['success'=>true,'data'=>$post]);

        }

        if($user_id){

            $posts = Post::withCount([
                'votes as up_count'=>function ($query){
                    $query->where('type','1');
                },
                'votes as down_count'=>function ($query){
                    $query->where('type','-1');
                },
            ])->orderBy('created_at','desc')->where('user_id',$user_id)->with('user')->with('user.profile')->get();
            return response()->json(['success'=>true,'data'=>$posts]);

        }//

        $posts = Post::withCount([
            'votes as up_count'=>function ($query){
                $query->where('type','1');
            },
            'votes as down_count'=>function ($query){
                $query->where('type','-1');
            },
        ])->orderBy('created_at','desc')->with('user')->with('user.profile')->get();
        return response()->json(['success'=>true,'data'=>$posts]);
    }//

    public function increaseView(Request $request){

        $post_id = $request->post_id;
        $user_id = auth()->user()->id;

        if(!$post_id){
            return response()->json(['errors'=>['post_id'=>'Please provide post id']],400);
        }//

        Post::where('id',$post_id)->increment('view_count',1);

        return response()->json(['success'=>true,'data'=>[]]);
    }//

    public function vote(Request $request){

        $post_id = $request->post_id;
        $user_id = auth()->user()->id;
        $vote_type = $request->vote_type;

        if(!$post_id){
            return response()->json(['errors'=>['post_id'=>'Please provide post id']],400);
        }//

        if( !($vote_type ==-1 || $vote_type==1 || $vote_type==0) ){
            return response()->json(['errors'=>['vote_type'=>'Please provide proper vote_type']],400);
        }

        if($vote_type==0){
            Vote::where('post_id',$post_id)->where('user_id',$user_id)->delete();
            return response()->json(['success'=>true,'data'=>[]]);
            // else return response()->json(['errors'=>['default'=>'User is not voted already']],400);
        }//remove vote

        $vote = Vote::where('post_id',$post_id)->where('user_id',$user_id)->first();
        // return response()->json(['success'=>true,'data'=>$vote]);

        if( !$vote ){
            $vote = Vote::create(['user_id'=>$user_id,'post_id'=>$post_id,'type'=>$vote_type]);
            if($vote) return response()->json(['success'=>true,'data'=>[]]);
            else return response()->json(['errors'=>['default'=>"Something went wrong creating votes"]],400);
        }//if first time voting

        $vote->type = $vote_type;
        $vote->save();
        return response()->json(['success'=>true,'data'=>[]]);
    }//vote



}
