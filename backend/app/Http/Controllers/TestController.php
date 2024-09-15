<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Vote;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index(Request $request){

        $amount = 100;
        $product_id = 1234566666666666666;
        $secret = "8gBm/:&EnhH.1/q";
        $message = "total_amount=$amount,transaction_uuid=$product_id,product_code=EPAYTEST";
        $signature  = hash_hmac('sha256', $message, $secret, true);;
        
        // base64_decode();
        // user,product,product_name,price,transcation_id,
        //pay route,

        return response()->view('esewa',['amount'=>$amount,
        'product_id'=>$product_id,
        'signature'=>base64_encode($signature)
    ]);
      
    }// 

    
}
