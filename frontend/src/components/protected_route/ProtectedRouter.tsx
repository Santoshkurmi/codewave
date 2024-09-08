import { useNavigate } from "react-router-dom";
import useAuthStore from "../../zustand/AuthStore";
// import userStore from "../../zustand/UserStore"


/**
 * If the user is not logged in, this component will redirect the user to the
 * login page. Otherwise, it will render the component passed as the `children`
 * prop.
 *
 * @example
 * <ProtectedRouter>
 *   <Home />
 * </ProtectedRouter>
 *
 * @returns {JSX.Element} A JSX element that redirects if the user is not
 * logged in, or renders the `children` component if the user is logged in.
 */
function ProtectedRouter({}) {
  const token = useAuthStore().token;
  const navigate = useNavigate();
  if(!token) return navigate('/login');
  return (
    <div>ProtectedRouter</div>
  )
}

export default ProtectedRouter