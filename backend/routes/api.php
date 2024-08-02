<?php
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;


Route::post('/register',[AuthController::class,"register"]);
Route::get('/register',[AuthController::class,"register"]);