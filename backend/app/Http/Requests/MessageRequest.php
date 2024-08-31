<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class MessageRequest extends FormRequest
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
            // 'text'=>'required|min:1',
            'user_id'=>'required|exists:users,id'
        //     'conversation_id'=>'required|exists:conversations,id'
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        // return $validator->errors();
        $response = response()->json(['errors'=>$validator->errors()->messages(),'success'=>false]);
        return throw new  HttpResponseException($response);
    }
}
