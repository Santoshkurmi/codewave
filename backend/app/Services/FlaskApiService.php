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

    public function search(String|null $query)
    {
        $result = Http::get("{$this->baseUrl}/search?query=". $query);
        // print_r($result);
        return $result->json();
    }
}
