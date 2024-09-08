<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostView;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PostViewController extends Controller
{
    public function increaseView(Request $request){

        $post_id = $request->post_id;
        $user_id = auth()->user()->id;

        $post = Post::where(['id'=>$post_id,'user_id'=>$user_id])->first();
        if($post) return response()->json([]);

        if(!$post_id){
            return response()->json(['errors'=>['post_id'=>'Please provide post id']],400);
        }//

        $twoHoursAgo = Carbon::now()->subHours(1);
        $postView = PostView::where(['user_id'=>$user_id,'post_id'=>$post_id])->where('viewed_at','<',$twoHoursAgo)->first();
        if($postView){
            return response()->json([]);
        }//
        $viewNew = PostView::create(['post_id'=>$post_id,'user_id'=>$user_id]);
        if(!$viewNew){
            return response()->json([],400);
        }

        $count = Post::where('id',$post_id)->increment('view_count',1);

        return response()->json(['success'=>true,'data'=>['view_count'=>$count]]);
    }//
}
