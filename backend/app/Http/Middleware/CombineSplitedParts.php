<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CombineSplitedParts
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $signature = $request->cookie('access_token');
        $headerAndPayload = $request->header('Authorization');
        if($signature && $headerAndPayload){
            $combinedToken = $headerAndPayload.".".$signature;
            $request->headers->set('Authorization','Bearer '.$combinedToken);
        }

        return $next($request);
    }
}
