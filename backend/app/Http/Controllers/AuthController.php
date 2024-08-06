<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Psy\Readline\Hoa\Console;

class AuthController extends Controller
{


    public function register(RegisterRequest $request){

        $user = new User([
            'name'=>$request->name,
            'email'=>$request->email,
            'username'=>$request->username,
            'password'=>bcrypt($request->password)
        ]);


        if($user->save()){
            $generateToken = $user->createToken($request->email);
            $token = $generateToken->plainTextToken;
            return response()->json([
                'msg' => 'Successfully created user!',
                'token'=> $token,
                'success'=>true,
                'data'=>$user
                ],201);
        }//if saved

        else{
            return response()->json(['errors'=>['default'=>'Provide proper details'],'success'=>false ]);
        }
    }//register



    public function login(LoginRequest $loginRequest){
        $user = User::where('email',$loginRequest->username)->orWhere('username',$loginRequest->username)->first();
        if(!$user || !Hash::check($loginRequest->password, $user->password) ){
            return response()->json(["errors"=>['default'=>"The provided credential is invalid"],"success"=>false]);
        }//if false
        else{
            return response()->json(["success"=>true,'data'=>$user,"msg"=>"Login successfull","token"=>$user->createToken($user->email)->plainTextToken]);
        }
    }//login



    public function logout(){
        auth()->user()->currentAccessToken()->delete();
        return response()->json(['msg'=>'User is log out','success'=>true]);
    }//logout


    public function getAllUsers(){
        $user = User::all();
        return response()->json(['success'=>true,'msg'=>'fetched success','data'=>$user]);
    }//getAllUsers
}
