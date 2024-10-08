<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CodeRunner;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostViewController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\VoteController;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/login',function(){
    return response()->json(['success'=>false,'errors'=>'Unauthorized User'],403);
})->name('login');


// Route::post('register',[AuthController::class,'register']);
Route::prefix('v1')->group(function(){

    // Route::post('login',[AuthController::class,'login']);
    Route::post('/register',[AuthController::class,'register']);
    Route::post('/login',[AuthController::class,'login']);
    Route::post('/refresh_token',[AuthController::class,'refreshAccessToken']);

});

//api_auth
Route::prefix('v1')->middleware('api_auth')->group(function(){

    // Route::post(uri: '/get',[AuthController::class,'search']);

    Route::get('/notifications',[NotificationController::class,'getNotifications']);


    Route::get('/search',[SearchController::class,'search']);
    
    Route::get('/count',[VoteController::class,'totalVoteOfUser']);

    Route::get('/recommend',[SearchController::class,'recommend']);
    Route::post('/similar',[SearchController::class,'similar']);



    Route::post('/logout',[AuthController::class,'logout']);


    Route::post('users',[AuthController::class,'getAllUsers']);
    
 
    Route::post('message/send',[MessageController::class,'send']);
    Route::post('messages',[MessageController::class,'get']);
    Route::post('message/view',[MessageController::class,'updateMessageSeen']);

    Route::post('conversations',[ConversationController::class,'getConversations']);

    // Route::post('logout',[AuthController::class,'logout']);


    //profiles

    Route::post('upload_profile_pic',[ProfileController::class,'uploadProfilePic']);
    Route::post('upload_cover_pic',[ProfileController::class,'uploadCoverPic']);
    Route::post('get_user_profile',[ProfileController::class,'getUser']);
    Route::post('update_bio',[ProfileController::class,'updateBio']);


    //post

    Route::post('create_post',[PostController::class,'create']);
    Route::post('posts',[PostController::class,'get']);
    Route::post('delete_post',[PostController::class,'delete']);
    Route::post('update_post',[PostController::class,'update']);


    // Route::post('post_all',[PostController::class,'getPostAllAnswers']);
    Route::post('increase_post_view',[PostViewController::class,'increaseView']);
    Route::post('post_answer',[AnswerController::class,'postAnswer']);
    Route::post('post_comment',[CommentController::class,'postComment']);
    Route::post('vote',[VoteController::class,'vote']);


    
    Route::post('store_image',[PostController::class,'storePostImage']);

    

    Route::post('run_code',[CodeRunner::class,'handleCodeRequest']);


});//api/v1 with sanctum protection



