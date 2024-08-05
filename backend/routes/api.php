<?php

use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/login',function(){
    return response()->json(['success'=>false,'errors'=>'Unauthorized User']);
})->name('login');

// Route::post('register',[AuthController::class,'register']);
Route::prefix('v1')->group(function(){

    Route::post('login',[AuthController::class,'login']);
    Route::post('register',[AuthController::class,'register']);
});
//api_auth
Route::prefix('v1')->middleware(['auth:sanctum'])->group(function(){
    
    Route::get('user',function(){
        return response()->json( ["id"=>request()->header("Authorization")] );
    });

    Route::get('logout',[AuthController::class,'logout']);

});

