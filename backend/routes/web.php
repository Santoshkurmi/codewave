<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;
use function Termwind\render;
// require "api.php";
// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/',function(){
    return view('welcome');
// echo import.meta.env.VITE_REVERB_APP_KEY;
});

Route::get('/test',[TestController::class,'index']);


// Route::get('/',[RegisterController::class,"index"]);
