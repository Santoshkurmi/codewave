<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostPhoto;
use App\Models\Vote;
use Illuminate\Http\Request;
use Response;

class PostController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */



    public function getPostAllAnswers(Request $request)
    {

    }
    public function storePostImage(Request $request)
    {

        // $user_id = $request->post_id;
        // $post_id = 1;

        if (!$request->hasFile('image')) {
            return response()->json(['errors' => ['default' => "Please provide image"]], 400);
        }

        $file = $request->file('image');
        $filename = hash('sha256', $file->getClientOriginalName() . " " . time()) . "." . $file->getClientOriginalExtension();

        $path = $file->storeAs('public/post_photos', $filename);

        if (!$path)
            return response()->json(['errors' => ['default' => "Could not upload the image."], 400]);

        $photo = PostPhoto::create(['image' => $filename]);

        return response()->json(['data' => $photo]);




    }//


    /**
     * Create a new post
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $content = $request->content;
        $user_id = auth()->user()->id;
        if (!$content || strlen($content) < 10) {
            return response()->json(['errors' => ['content' => 'Post must be more than 10 chars longs']], 400);
        }//if error

        $post = Post::create(['user_id' => $user_id, 'content' => $content]);
        if (!$post) {
            return response()->json(['success' => false, 'errors' => ['default' => 'Something went wrong creating the post,Please try again']], 400);
        }

        return response()->json(['success' => false, 'data' => $post]);

    }//create post

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    //
    public function update(Request $request)
    {

        $content = $request->content;
        $post_id = $request->post_id;
        $user_id = auth()->user()->id;
        if (!$content || strlen($content) < 10) {
            return response()->json(['errors' => ['content' => 'Post must be more than 10 chars longs']], 400);
        }//if error

        $isUpdated = Post::where('id', $post_id)->where('user_id', $user_id)->update(['content' => $content]);
        if (!$isUpdated) {
            return response()->json(['success' => false, 'errors' => ['default' => 'Something went wrong Updating the post,Please try again']], 400);
        }

        return response()->json(['success' => false, 'data' => []]);

    }//create post

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    //
    public function delete(Request $request)
    {
        $post_id = $request->post_id;
        $user_id = auth()->user()->id;

        $isDeleted = Post::where('id', $post_id)->where('user_id', $user_id)->delete();
        if (!$isDeleted) {
            return response()->json(['errors' => ['default' => 'Either post not exist or you have not permission to do so.']], 400);
        } else
            return response()->json(['success' => true, 'msg' => 'Deleted the post', 'data' => []]);
    }//delete




    /**
     * Get all posts or a single post by id
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function get(Request $request)
    {
        // $user_id = auth()->user()->id;
        $user_id = $request->user_id;
        $post_id = $request->post_id;

        if ($post_id) {

            $post = Post::withCount([
                'votes as up_count' => function ($query) {
                    $query->where('type', '1');
                },
                'votes as down_count' => function ($query) {
                    $query->where('type', '-1');
                },
               
            ])->orderBy('created_at', 'desc')->where('id', $post_id)->with([
                        'user',
                        'user.profile',
                        'answers' => function ($query) {
                            $query->withCount([
                                'votes as up_count' => function ($query) {
                                    $query->where('type', '1');
                                },
                                'votes as down_count' => function ($query) {
                                    $query->where('type', '-1');
                                }
                            ]);
                        }
                        
            ,
                        'answers.user',
                        'answers.user.profile',
                        'answers.comments',
                        'answers.comments.user',
                        'answers.comments.user.profile',
                    ])->first();
            if (!$post) {
                return response()->json(['errors' => ['default' => 'The post is not found']], 400);
            }

            return response()->json(['success' => true, 'data' => $post]);

        }

        if ($user_id) {

            $posts = Post::withCount([
                'votes as up_count' => function ($query) {
                    $query->where('type', '1');
                },
                'votes as down_count' => function ($query) {
                    $query->where('type', '-1');
                },
                'answers as answer_count'
            ])->orderBy('created_at', 'desc')->where('user_id', $user_id)->with('user')->with('user.profile')->get();
            return response()->json(['success' => true, 'data' => $posts]);

        }//

        $posts = Post::withCount([
            'votes as up_count' => function ($query) {
                $query->where('type', '1');
            },
            'votes as down_count' => function ($query) {
                $query->where('type', '-1');
            },
            "answers as answer_count"
        ])->orderBy('created_at', 'desc')->with('user')->with('user.profile')->get();
        return response()->json(['success' => true, 'data' => $posts]);
    }//







}
