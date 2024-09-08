import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import logo from "../../assets/logo.svg"
import { faBell, faMoon } from "@fortawesome/free-regular-svg-icons"
import { faPerson, faPlus, faSearch, faTextHeight } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useGetUserProfileQuery } from "../../api/apiSlice"
import { useCallback, useEffect, useState } from "react"
import ConfigStore from "../../zustand/ConfigStore"
import useAuthStore from "../../zustand/AuthStore"

/**
 * This component renders the top navigation bar of the app.
 * It contains the app logo, a search input, and a button to add a new post.
 * It also renders the user's profile picture and a button to toggle the theme.
 * The component uses the useGetUserProfileQuery hook to fetch the user's profile data.
 * It uses the useNavigate hook to navigate to the profile page when the user clicks on their profile picture.
 * It uses the useState hook to store the user's profile picture and the theme.
 * It uses the useEffect hook to update the user's profile picture when the user logs in or logs out.
 * It uses the useCallback hook to memoize the setTheme function.
 * @returns {JSX.Element} The JSX element representing the top navigation bar.
 */
function Header() {
  const navigate = useNavigate();
  // const localUser = useAuthStore().user;
  const { isLoading,isFetching, data: user, isSuccess: isUserLoaded, isError: isProfileError } = useGetUserProfileQuery( null);
  const profilePlaceholder = "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png";
  const [profilePic,setProfilePic] = useState(profilePlaceholder);
  const setDarkTheme = ConfigStore().setDarkTheme;
  const { isHeaderNavHidden} =  ConfigStore();

  // const [isDarkTheme,setIsDarkTheme] = useState<boolean | null>(null);


  useEffect(()=>{
    if(!isUserLoaded) return;
    const profile =  user ? user.profile : null;
    if(!profile || !profile.profile_pic) {
      setProfilePic(profilePlaceholder);
      return;
    }
    if(profile.profile_pic) setProfilePic('http://localhost:8000/storage/profiles/'+profile.profile_pic);
  },[isFetching]);



  /**
   * A memoized function to toggle the theme.
   * @returns {void}
   */
  const setTheme = useCallback(() => {
    setDarkTheme();
  }, []);
  
  return (
    <div 
    className={"h-[5rem] transition-['top'] z-50 bg-white dark:bg-black left-0  right-0 select-none shadow-sm dark:shadow-slate-400 rounded-md flex items-center justify-between px-0 lg:px-8 "}>
        <div className="left flex items-center gap-2">            
            <img src={logo} onClick={()=>navigate('/')} className="cursor-pointer"  width={"50px"} alt="Logo" />
            <span className="pl-0 text-gray-700 dark:text-slate-300 font-bold text-xl">CodeWave</span>
                <div className="searchbox  relative">
                    <div className="icon  absolute top-0 left-2 bottom-0 flex justify-center items-center">
                      <FontAwesomeIcon icon={faSearch} size="xl" className="text-gray-700 dark:hover:bg-gray-600 dark:text-slate-300 hover:bg-gray-200 rounded-full p-4 sm:p-0"/>
                    </div>
                    <input className="hidden w-[30vw] max-w-[25rem] sm:block bg-slate-200 dark:placeholder:text-slate-200 dark:bg-slate-500 dark:outline-slate-500 p-2 pl-10 rounded-md outline-gray-300" placeholder="Search here" type="text" />
                </div>
        </div>
            
        <div className="right text-gray-700 justify-center items-center flex gap-5 pr-5 ">
            <FontAwesomeIcon onClick={()=>navigate('/add_post')} className="cursor-pointer dark:text-slate-300 dark:hover:text-slate-500  dark:active:text-slate-100 rounded-full" icon={faPlus} size="2x" />
            <FontAwesomeIcon className="cursor-pointer dark:text-slate-300 dark:hover:text-slate-500  dark:active:text-slate-100 rounded-full" icon={faBell} size="2x" />
            <FontAwesomeIcon onClick={()=>setTheme()} className="cursor-pointer  dark:text-slate-300 dark:hover:text-slate-500  dark:active:text-slate-100 rounded-full"  icon={faMoon} size="2x" />
            <img src={profilePic} alt="person" className="cursor-pointer h-[70px] p-2 w-[70px] rounded-full dark:hover:opacity-60 hover:bg-gray-200 active:bg-gray-300" onClick={()=>navigate('/profile')}/>
            {/* <FontAwesomeIcon className="cursor-pointer"  onClick={()=>navigate('/profile')} icon={faPerson} size="2x" /> */}
        </div>
    </div>
  )
}

export default Header