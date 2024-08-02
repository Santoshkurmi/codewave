<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate( [
            'name'=>"required|string|min:8|max:40",
            'email'=>"required|email|unique:users",
            'password'=>'required|string|min:6|max:30',
            'password_confirm'=>'required|same:password'
        ]); 
        $user = new User([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password)
        ]);

        if($user->save()){
            $generateToken = $user->createToken("Personal Token");
            $token = $generateToken->plainTextToken;
            return response()->json([
                'message' => 'Successfully created user!',
                'accessToken'=> $token,
                ],201);
        }//if saved

        else{
            return response()->json(['error'=>'Provide proper details']);
        }
    }//register
}
