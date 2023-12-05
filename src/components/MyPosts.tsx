import React from 'react'
import useAuthentication from '../customHook/isUserSignedIn';
import { useNavigate } from 'react-router-dom';

export default function MyPosts() {

  const { isUserSignedIn } = useAuthentication();

  const navigate = useNavigate();

  const redirectPageAuth = () => {
    navigate('/authentication')
  }

  return (
   <>
    {isUserSignedIn 
    ?(<div>No post created yet.</div>)
    :(<div>
      <h1 className="text-lg font-semibold">
        User is not signed in. Please sign in first.
      </h1>
      <button
      onClick={redirectPageAuth}
      className="px-2 py-2 border border-blue-900 rounded-lg text-blue-800 font-semibold hover:bg-blue-700 hover:text-white"
      >Sign in Now</button>
    </div>)
  }
   </>
  )
}
