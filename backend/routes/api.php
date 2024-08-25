<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/login',function(){
    return response()->json(['success'=>false,'errors'=>'Unauthorized User'],400);
})->name('login');

// Route::post('register',[AuthController::class,'register']);
Route::prefix('v1')->group(function(){

    Route::post('login',[AuthController::class,'login']);
    Route::post('register',[AuthController::class,'register']);
});



//api_auth
Route::prefix('v1')->middleware(['auth:sanctum'])->group(function(){

    Route::post('users',[AuthController::class,'getAllUsers']);
    

    Route::post('message/send',[MessageController::class,'send']);
    Route::post('messages',[MessageController::class,'get']);

    Route::post('conversations',[ConversationController::class,'getConversations']);

    Route::post('logout',[AuthController::class,'logout']);


    //profiles

    Route::post('upload_profile_pic',[ProfileController::class,'uploadProfilePic']);
    Route::post('upload_cover_pic',[ProfileController::class,'uploadCoverPic']);
    Route::post('get_user_profile',[ProfileController::class,'getUser']);
    Route::post('update_bio',[ProfileController::class,'updateBio']);


    //post

    Route::post('create_post',[PostController::class,'create']);
    Route::post('posts',[PostController::class,'get']);
    Route::post('increase_post_view',[PostController::class,'increaseView']);
    Route::post('vote_post',[PostController::class,'vote']);
    Route::post('delete_post',[PostController::class,'delete']);
    Route::post('update_post',[PostController::class,'update']);



});//api/v1 with sanctum protection



