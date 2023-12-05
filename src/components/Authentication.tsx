import React from 'react'
import useAuthentication from '../customHook/isUserSignedIn'


export default function Authentication() {

    const { isUserSignedIn, signIn, signOut} = useAuthentication();


  return (
    <div>
        <h1>{isUserSignedIn ? 'user is signed in': 'user is not signed in'}</h1>
        <div className="mt-5">
            {isUserSignedIn ? (
            <button className="btn log" onClick={signOut}>Sign Out</button>
        ): (
            <button className="btn reg" onClick={signIn}>Log In</button>
        )}
        </div>
        
    </div>
  )
}
