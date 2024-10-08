<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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
            'username'=>'required|min:6',
            'password'=>'required|min:6'
            //
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        // return $validator->errors();
        $response = response()->json(['errors'=>$validator->errors()->messages(),'success'=>false]);
        return throw new  HttpResponseException($response);
    }
}
