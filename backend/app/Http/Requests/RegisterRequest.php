<?php

namespace App\Http\Requests;

use Dotenv\Exception\ValidationException;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use JsonException;

class RegisterRequest extends FormRequest
{
   
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>"required|string|min:8|max:40",
            'email'=>"required|email|unique:users",
            'username'=>"required|min:6|max:15|unique:users",
            'password'=>'required|string|min:6|max:30',
            'confirmPassword'=>'required|same:password'
            //
        ];
    }
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        // return $validator->errors();
        $response = response()->json(['errors'=>$validator->errors()->messages(),'success'=>false]);
        return throw new  HttpResponseException($response);
    }
}
