<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\FlaskApiService;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request){
        $flaskApi = new FlaskApiService();
        $result = $flaskApi->search($request->input('query'));
        // ->whereIn('id', $ids)
        if( count( $result )==0 ) return response()->json(['data'=>[]]); 
        
        $posts = Post::withCount([
            'votes as up_count' => function ($query) {
                $query->where('type', '1');
            },
            'votes as down_count' => function ($query) {
                $query->where('type', '-1');
            },
            "answers as answer_count"
        ])->whereIn('id',$result)->with('user')->with('user.profile')
        ->orderByRaw("FIELD(id, " . implode(',', $result) . ")")
        ->get();
        
        return response()->json(['data'=>$posts]);
    }
}
