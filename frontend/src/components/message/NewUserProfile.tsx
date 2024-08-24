import { faPerson } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { memo } from "react"
import { Navigate, useNavigate } from "react-router-dom"

function NewUserProfile({ id,name }: any) {
    const navigate = useNavigate()
    console.log(name)
    return <div onClick={() => navigate('/messages/' + id)} className="p-4 rounded-lg border-b-2 dark:bg-gray-700 dark:hover:bg-gray-800 hover:bg-gray-200 active:bg-gray-300 flex mb-7 gap-4">
        <FontAwesomeIcon icon={faPerson} size="2xl" />
        <span>{name}</span>
        <span>{id}</span>
    </div>
}

export default memo(NewUserProfile)