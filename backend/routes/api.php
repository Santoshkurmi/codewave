<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
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

});

