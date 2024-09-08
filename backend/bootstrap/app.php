<?php

use App\Http\Middleware\ApiAuthenciate;
use App\Http\Middleware\CombineSplitedParts;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Session\Middleware\StartSession;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api()->append(AddQueuedCookiesToResponse::class);
        $middleware->api()->append(CombineSplitedParts::class);
        // $middleware->append(CombineSplitedParts::class);
        // $middleware->api()->append(Cooki::class);
        // $middleware->api()->append();
        // AddQueuedCookiesToResponse:
        $middleware->alias(['api_auth'=>ApiAuthenciate::class]);
        // $middleware->append(EnsureFrontendRequestsAreStateful::class);
        // $middleware->statefulApi();
        // $middleware->api()->append(EnsureFrontendRequestsAreStateful::class);
        // $middleware->api()->append(EncryptCookies::class);
        // $middleware->api()->append(StartSession::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // $exceptions->shouldRenderJsonWhen(function (){return true;});
        // $exceptions->respond(function($exception){
            // return  throw new HttpResponseException(response()->json(['message'=>'Something went wrong'],400));
        // });
    })->create();
