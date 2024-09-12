<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

// Broadcast::routes();
Broadcast::routes(['middleware' => ['api_auth','auth:api']]);

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return true;
    // return (int) $user->id === (int) $id;
});

Broadcast::channel('message.sent.{id}',function (User $user,$id){
    // echo "Hello";
    // return true;
    return (int) $user->id === (int) $id;
});