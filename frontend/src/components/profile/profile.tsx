import { useEffect, useMemo, useRef, useState } from "react";
import { useGetPostQuery, useGetUserProfileQuery, useUpdateBioMutation, useUploadCoverPicMutation, useUploadProfilePicMutation } from "../../api/apiSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../post/Post";
import useAuthStore from "../../zustand/AuthStore";

export default function Profile() {

  const user_id = useParams().user_id;
  const localUser = useAuthStore().user;
  const fileRef = useRef<HTMLInputElement>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLImageElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const [uplaodProfile, { isLoading: isProfileLoading, }] = useUploadProfilePicMutation();
  const [uplaodCover, { isLoading: isCoverLoading }] = useUploadCoverPicMutation();
  const { isLoading,isFetching, data: user, isSuccess: isUserLoaded, isError: isProfileError } = useGetUserProfileQuery(user_id? Number(user_id) : null);
  const [uploadBio, { isLoading: isBioUpdating }] = useUpdateBioMutation();
  const [profilePic, setProfilePic] = useState("")
  const [coverPic, setCoverPic] = useState("")
  const [bio, setBio] = useState("This is your bio");
  const [bioEdit, setBioEdit] = useState("");


  const {isLoading:isPostLoading,isError:isPostError,isSuccess:isPostSuccess,data:posts} = useGetPostQuery({user_id:user_id? user_id:localUser?.id});

  // const profile = useMemo(() => user ? user.profile : null, [isLoading]);
  const [isBioEditing, setBioEditing] = useState(false);
  const navigate = useNavigate();

  const handleBioUpdate = async () => {
    try {
      const res = await uploadBio(bioEdit).unwrap();
      setBioEditing(false);
      // alert("Hey")
      if (res) {
        setBio(res.bio);
        toast.success("Bio  updated successfully");
      }//success
      else {
        setBio(bio + " ");
        toast.error("Error updating bio");
      }//error
    }
    catch (err) {
      console.log(err);
    }//err
  }


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const image = files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("profile_pic", image);

    try {
      const res = await uplaodProfile(formData).unwrap();
      if (!res) {
        toast.error("Something went wrong uploading the image");
        return;
      }
      console.log(res);
      toast.success("Profile picture uploaded successfully");
      setProfilePic("http://localhost:8000/storage/profiles/" + res.profile_pic);

    }
    catch (error) {
      console.log(error);
    }


  }//

  const handleFileChangeCover = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const image = files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("cover_pic", image);

    try {
      const res = await uplaodCover(formData).unwrap();
      if (!res) {
        toast.error("Something went wrong uploading the image");
        return;
      }
      console.log(res);
      toast.success("Cover picture uploaded successfully");
      setCoverPic("http://localhost:8000/storage/profiles/" + res.cover_pic);

    }
    catch (error) {
      console.log(error);
    }


  }//



  // console.log(user,"No",isUserLoaded)
  useEffect(() => {
    // alert("he")
    // console.log(user);
    console.log(user,"Yes");
    if (!isUserLoaded) return;
    const profile =  user ? user.profile : null;
    if (!profile) {
      setProfilePic("https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png");
      setCoverPic("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS2EcdIORfXbTTFGFHRJaIzFgicsaitEv1fQ&s")
      return;
    }
    if (!profile.profile_pic)
      setProfilePic("https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png");
    else
      setProfilePic("http://localhost:8000/storage/profiles/" + profile.profile_pic);


    if (!profile.cover_pic)
      setCoverPic("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS2EcdIORfXbTTFGFHRJaIzFgicsaitEv1fQ&s")
    else
      setCoverPic("http://localhost:8000/storage/profiles/" + profile.cover_pic);

    if (!profile.bio)
      setBio("No Bio");
    else{
      setBio(profile.bio);
      setBioEdit(profile.bio);
    }

  }, [isFetching])

  // console.log(user);



  if (isLoading) return (
    <div className="wrap w-full  flex justify-center">
      <div className="spinner shadow-lg  mt-44 h-[100px] w-[100px]"></div>
    </div>
  )
  if (isProfileError || !user) return (<div className="mt-5">Something went wrong loading this profile</div>)

  return (
    <div className="mt-5 ">
      <div className="cover select-none relative">

        <input
          type="file"
          ref={coverFileRef}
          className="hidden"
          onChange={handleFileChangeCover}
          accept="image/*"
        />

        {
          isCoverLoading ?
            <div className="div w-full flex justify-center items-center">
               <div className="spinner bg-white dark:bg-gray-500 h-[200px] w-[200px] rounded-full dark:shadow-gray-100 dark:shadow-sm shadow-lg">
               </div>
            </div>
            :
            <img
              ref={profileRef}
              onClick={() =>localUser?.id==user.id? coverFileRef.current?.click():null}
              className="w-full h-[200px] object-cover rounded-lg shadow-lg"
              alt=""
              src={coverPic}

            />
        }

        {/* <img

          className="w-full h-[200px] object-cover rounded-lg"
          src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
          alt=""
        /> */}

        <div className="profile w-[80%] mt-2  flex flex-col items-center justify-center absolute top-[60%] left-[50%] -translate-x-[50%]">
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />

          {
            isProfileLoading ?
              <div className="spinner bg-white dark:bg-black dark:shadow-gray-600  h-[200px] w-[200px] rounded-full shadow-lg">
                {/* <div className=" h-[50px] w-[50px]"></div> */}
              </div> :
              <img
                ref={profileRef}
                onClick={() => localUser?.id==user.id? fileRef.current?.click():null}
                className="hover:scale-110 transition-transform h-[200px] bg-white w-[200px] object-cover rounded-full shadow-lg"
                alt=""
                src={profilePic}

              />
          }

          <div  className=" select-text details flex flex-col justify-center items-center">
            <div className="name text-3xl">{user.name}</div>

            {
              !isBioEditing ?
                <>
                  <p contentEditable={isBioEditing} ref={bioRef} className={"bio rounded-lg p-4 dark:bg-gray-800  outline-none text-xl mt-5 " + (isBioEditing ? "shadow-lg" : "")}>
                    {bio}
                  </p>
                 {
                 
                 localUser?.id==user.id?
                  <button onClick={() => setBioEditing(true)} className="bg-gray-300 dark:bg-gray-700 mt-4 px-4 py-1 rounded-lg">Edit Bio</button>
                  :null
                 } 

                </>
                :
                <>
                   <textarea rows={6} onChange={(e)=>setBioEdit(e.target.value)} className="block p-4 mt-5 dark:bg-black dark:border rounded-lg" value={bioEdit} /> 
                <div className="buttons flex justify-between gap-5">
                  <button onClick={()=>setBioEditing(false)} className="bg-gray-300 dark:bg-gray-700 mt-4 px-4 py-1 rounded-lg">Cancel</button>
                  <button disabled={isBioUpdating} onClick={handleBioUpdate} className="bg-gray-300 dark:bg-gray-700 mt-4 px-4 py-1 rounded-lg disabled:bg-gray-200 dark:disabled:bg-gray-500">Save</button>
                </div>

                </>
               


            }

          </div>
          {
             !(localUser?.id==user.id)? <button className="my-5 bg-blue-600 py-2 px-4 rounded-lg hover:bg-blue-700 active:bg-blue-800 " onClick={()=>navigate('/messages/'+user.id)}>Message</button>:null

          }

          <h3 className="self-start text-2xl font-bold mt-5 mb-10">Achievements:</h3>
          <div className="achieves  flex flex-wrap gap-5">
            <div className="box border p-4 rounded-lg shadow-lg">
              <div className="header flex gap-8">
                <img
                  className="w-[100px]"
                  src="https://t4.ftcdn.net/jpg/03/50/11/83/360_F_350118359_fs2GIXzHjBhStQtRXq4yI927EcSxfS9A.jpg"
                  alt=""
                />
                <div className="no of flex flex-col">
                  <div className="no text-3xl">30</div>
                  <div className="desc">gold badges</div>
                </div>
              </div>
            </div>

            <div className="box border p-4 rounded-lg shadow-lg">
              <div className="header flex gap-8">
                <img
                  className="w-[100px]"
                  src="https://t4.ftcdn.net/jpg/03/50/11/83/360_F_350118359_fs2GIXzHjBhStQtRXq4yI927EcSxfS9A.jpg"
                  alt=""
                />
                <div className="no of flex flex-col">
                  <div className="no text-3xl">30</div>
                  <div className="desc">gold badges</div>
                </div>
              </div>
            </div>
            <div className="box border p-4 rounded-lg shadow-lg">
              <div className="header flex gap-8">
                <img
                  className="w-[100px]"
                  src="https://t4.ftcdn.net/jpg/03/50/11/83/360_F_350118359_fs2GIXzHjBhStQtRXq4yI927EcSxfS9A.jpg"
                  alt=""
                />
                <div className="no of flex flex-col">
                  <div className="no text-3xl">30</div>
                  <div className="desc">gold badges</div>
                </div>
              </div>
            </div>
            <div className="box border p-4 rounded-lg shadow-lg">
              <div className="header flex gap-8">
                <img
                  className="w-[100px]"
                  src="https://t4.ftcdn.net/jpg/03/50/11/83/360_F_350118359_fs2GIXzHjBhStQtRXq4yI927EcSxfS9A.jpg"
                  alt=""
                />
                <div className="no of flex flex-col">
                  <div className="no text-3xl">30</div>
                  <div className="desc">gold badges</div>
                </div>
              </div>
            </div>


            

          </div>

          <div className="post self-start w-full">
              <h1 className="mt-5 text-3xl font-bold my-5">Posts</h1>
              {
                isPostLoading ? <div className="spinner h-[60px] w-[60px]"></div>
                : null
              }
              {
                isPostSuccess ? posts.map((post:any)=>{
                  // console.log(key)
                  return <Post {...post} key={post.id}/>
                })

               :null
              }
            </div>

        </div>
      </div>
    </div>
  );
}
