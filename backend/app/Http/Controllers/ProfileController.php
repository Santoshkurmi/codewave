<?php

namespace App\Http\Controllers;

use App\Models\ConversationUser;
use App\Models\User;
use App\Models\UserProfile;

use Exception;
use Illuminate\Http\Request;
use Storage;

class ProfileController extends Controller
{
    public function getUser(Request $request){
        $id = $request->user_id;
        if(!$id){
            $id = auth()->user()->id;
        //    return response()->json(['errors'=>['default'=>'Please provide UserId']],400);
        }//if not

        $user = User::with('profile')->find($id);
        if($user)
            return response()->json(['data'=>$user]);
        return response()->json(['errors'=>['default'=>'Please provide correct UserId']],400);

        
    }//getUser

    public function updateBio(Request $request){
        $bio = $request->bio;
        if(!$bio) return;
        $bio = htmlentities($bio);

        $profile = UserProfile::where('user_id',auth()->user()->id)->first();
            
        if(!$profile){
                $profile = new UserProfile(['user_id'=>auth()->user()->id]);
            }//if not profile

        $profile->bio = $bio;
        $profile->save();

        return response()->json(['success'=>true,'data'=>$profile]);
        


        
    }//

    public function uploadProfilePic(Request $request){

            // sleep(5);

            $request->validate([
                'profile_pic' => 'required|image|mimes:jpeg,png,jpg,webp',
            ]);
            // print_r($request->__tostring());

            // return response()->json($request->files->get('profile_pic'));
            if(!$request->hasFile('profile_pic')){
                return response()->json([ 'errors'=>['default'=>"Please provide the image"] ],400);
            }
            $file = $request->file('profile_pic');
            $filename = hash('sha256', $file->getClientOriginalName()." ".time() ).".".$file->getClientOriginalExtension();


            $profile = UserProfile::where('user_id',auth()->user()->id)->first();
            
            if($profile && $profile->profile_pic){
                Storage::delete("public/profiles/".$profile->profile_pic);
            }

            if(!$profile){
                $profile = new UserProfile(['user_id'=>auth()->user()->id]);
            }//if not profile
            $path = $file->storeAs('public/profiles',$filename);
            if(!$path)
            return response()->json([ 'errors'=>['default'=>"Could not upload the image."] ],400);


            $path = $filename;
            $profile->profile_pic =$path;

            $profile->save();
            return response()->json(['success'=>true,'data'=>$profile]);
    }//upload Image

    public function uploadCoverPic(Request $request){

        // sleep(5);

        $request->validate([
            'cover_pic' => 'required|image|mimes:jpeg,png,jpg,webp',
        ]);
        // print_r($request->__tostring());

        // return response()->json($request->files->get('profile_pic'));
        if(!$request->hasFile('cover_pic')){
            return response()->json([ 'errors'=>['default'=>"Please provide cover_pic the image"] ],400);
        }
        $file = $request->file('cover_pic');
        $filename = hash('sha256', $file->getClientOriginalName()." ".time() ).".".$file->getClientOriginalExtension();


        $profile = UserProfile::where('user_id',auth()->user()->id)->first();
        
    
            if($profile && $profile->cover_pic){
                Storage::delete("public/profiles/".$profile->cover_pic);
            }
    

        if(!$profile){
            $profile = new UserProfile(['user_id'=>auth()->user()->id]);
        }//if not profile
        $path = $file->storeAs('public/profiles',$filename);
        if(!$path)
        return response()->json([ 'errors'=>['default'=>"Could not upload the image."],400 ]);


        $profile->cover_pic =$filename;
        $profile->save();

        return response()->json(['success'=>true,'data'=>$profile]);
}//upload Image
}
