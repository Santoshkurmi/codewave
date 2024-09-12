<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\RefreshToken;
use App\Models\User;
use Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use Psy\Readline\Hoa\Console;
use Request;

class AuthController extends Controller
{

    public function register(RegisterRequest $request)
    {

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => bcrypt($request->password)
        ]);



        if ($user->save()) {

            return response()->json([
                'msg' => 'Successfully created user!',
                'data'=>null,
                // 'token'=> $token,
                'success' => true,
                // 'data'=>$user
            ], 201);
        }//
        else {
            return response()->json(['errors' => ['default' => 'Provide proper details'], 'success' => false]);
        }
    }//register


    //hello world this is good for here.
    public function login(LoginRequest $loginRequest)
    {

        $user = User::where('email', $loginRequest->username)->orWhere('username', $loginRequest->username)->first();

        if (!$user || !Hash::check($loginRequest->password, $user->password)) {
            // session()->regenerate();
            return response()->json(["errors" => ['default' => "The provided credential is invalid"], "success" => false],200);
        }//if false
        else {
            $token = auth()->login($user);
            if ($token) {
                return $this->respondWithTokens($token,$user->id);
            }
            return response()->json(["errors" => ['default' => "Something went wrong"], "success" => false],200);
        }

    }//login

    private function respondWithTokens($token,$user_id)
    {
        // $user = RefreshToken::find(auth()->user()->id);

        
        $refreshToken = bin2hex(random_bytes(32)) . "=" . $user_id;

        $expiresAt = now()->addDays(30);

        $refTokenDb = RefreshToken::find($user_id);
        if($refTokenDb){
            $refTokenDb->token = hash('sha256',$refreshToken);
            $refTokenDb->expiry_date = $expiresAt;
            $refTokenDb->save();
        }
        else{
            $refTokenDb = RefreshToken::create(['token' => hash('sha256', $refreshToken), 'expiry_date' => $expiresAt,'user_id' => $user_id]);
        }
           
        if (!$refTokenDb) {
            return response()->json(['errors' => ['default' => "Something went wrong generating tokens"]], 400);
        }

        [$header,$payload, $signature] = explode('.', $token);
        $headerAndPayload = $header.'.'.$payload;

        Cookie::queue(Cookie::make(
            'access_token',  // Cookie name
            $signature,      // Cookie value (unhashed token)
            0,     // Cookie expiration time ( 60 mins by default)
            '/',              // Path
            'localhost',// Domain (use your app domain)
            false,             // Secure flag (only send over HTTPS)
            true,             // HttpOnly flag (prevents JS access)
            true,            // SameSite flag (use "lax" or "strict" if needed)
            'lax'             // Set SameSite attribute (optional)
        ));

        Cookie::queue(Cookie::make(
            'refresh_token',  // Cookie name
            $refreshToken,      // Cookie value (unhashed token)
            60 * 24 * 30,     // Cookie expiration time (30 days)
            '/',              // Path
            'localhost',// Domain (use your app domain)
            false,             // Secure flag (only send over HTTPS)
            true,             // HttpOnly flag (prevents JS access)
            true,            // SameSite flag (use "lax" or "strict" if needed)
            'lax'             // Set SameSite attribute (optional)
        ));

        return response()->json([
            'access_token' => $headerAndPayload,
            // 'refresh_token'=>$refreshToken,
            // 'token_type' => 'bearer',
            // 'expires_in' => auth()->factory()->getTTL() * 60
        ]);

    }//generate access and refresh token


    public function refreshAccessToken(\Illuminate\Http\Request $request)
    {

        
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return response()->json(['msg' => 'No refresh token provided'], 406);
        }
        $hashedRefreshToken = hash('sha256', $refreshToken);

        // Find the token in the database
        $token = RefreshToken::where('token', $hashedRefreshToken)->first();

        if ($token && $token->expiry_date > now()) {
            try{
                $accessToken = auth()->refresh();
            }
            catch(JWTException $jwtException){
                $cookie1 = Cookie::forget('refresh_token');
                $cookie2 = Cookie::forget('access_token');
                return response()->json(['message' => 'Invalid or expired refresh token'], 406)->withCookie($cookie1)->withCookie($cookie2);
            }

            return $this->respondWithTokens(auth()->refresh(),$token->user_id);
        }
        $cookie1 = Cookie::forget('refresh_token');
        $cookie2 = Cookie::forget('access_token');
        return response()->json(['message' => 'Invalid or expired refresh token'], 406)->withCookie($cookie1)->withCookie($cookie2);

    }

    public function logout(\Illuminate\Http\Request $request)
    {
        $user_id = auth()->user()->id;

        $isDeleted = RefreshToken::where(['user_id' => $user_id])->delete();
        // if (!$isDeleted)
        //     return response()->json(['errors' => ['default' => 'Something went wrong logging out']], 400);

        $cookie1 = Cookie::forget('refresh_token');
        $cookie2 = Cookie::forget('access_token');
        return response()->json(['message' => 'User is log out', 'success' => true])->withCookie($cookie1)->withCookie($cookie2);
    }//logout


    public function getAllUsers()
    {
        $user = User::all();
        return response()->json(['success' => true, 'msg' => 'fetched success', 'data' => $user]);
    }//getAllUsers
}
