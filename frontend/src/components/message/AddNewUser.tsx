import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import createFuzzySearch from "@nozbe/microfuzz";
import NewUserProfile from "./NewUserProfile";
import { useGetUsersQuery, useLogoutMutation } from "../../api/apiSlice";

function AddNewUser() {
  // const { loading, users, getUsers } = useUser()
  const { isSuccess, isLoading, data: users } = useGetUsersQuery();
  const [filteredUsers, setFilteredUsers] = useState<any>([]);

  const navigate = useNavigate();


  const fuzzySearch = useMemo(() => {
    if (users != null)
      return createFuzzySearch(users, {
        key: "name",
        strategy: "aggressive",
      });
    else {
      return createFuzzySearch([]);
    }
  }, [users]);

  // alert("Hello");
  // useEffect(() => {
  //     getUsers();
  // }, []);

  useEffect(() => {
    mapUsers();
  }, [users]);

  const mapUsers = useCallback(() => {
    const formatedList = users?.map((user) => {
      return { item: user };
    });
    if (formatedList != undefined) setFilteredUsers(formatedList);
  }, [users]);

  const filter = useCallback(
    (text: string) => {
      if (text.length == 0) {
        mapUsers();
        return;
      } //if
      setFilteredUsers(fuzzySearch(text));
    },
    [users]
  ); //fuzzy Search

  console.log(users);

  return (
    <div className="bg-white dark:bg-black z-50   border shadow-lg p-6 absolute top-5 rounded-md left-0 w-full">
      <input
        onChange={(e) => filter(e.target.value)}
        className="mb-4 dark:bg-gray-600 dark:border-0 bg-gray-200 border w-full p-3 rounded-lg"
        type="text"
        placeholder="Search User"
      />
      <div className="divider w-full h-[1px] bg-gray-300 mb-6"></div>
      <div className="overflow-y-auto h-[40vh]">
        {
          isLoading ? <div className="h-full flex justify-center items-center">
            <div className="spinner h-32 w-32 shadow-lg rounded-full"></div>
          </div> : filteredUsers.map((user: any) => {
            // {console.log(user)}
            return <NewUserProfile key={user.item.id} {...user.item} />;
          })

        }

      </div>
    </div>
  );
}

export default AddNewUser;
