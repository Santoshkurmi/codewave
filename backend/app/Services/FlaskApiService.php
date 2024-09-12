<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class FlaskApiService
{
    protected $baseUrl;

    public function __construct()
    {
        $this->baseUrl = 'http://localhost:5000/api'; // Replace with your Flask API base URL
    }

    // public function search()
    // {
    //     $response = Http::get("{$this->baseUrl}/data");
    //     return $response->json();
    // }

    public function similar($query)
    {
        $result = Http::post("{$this->baseUrl}/similar",$query);
        // print_r($result);
        return $result->json();
    }

    public function search($query,$limit)
    {
        $result = Http::get("{$this->baseUrl}/search?query=". $query."&limit=500");
        // print_r($result);
        return $result->json();
    }

    public function recommend($user_id)
    {
        $result = Http::get("{$this->baseUrl}/recommend?user_id=". $user_id);
        // print_r($result);
        return $result->json();
    }
}
