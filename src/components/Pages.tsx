import React from 'react'
import {Route, Routes as ReactRoutes} from "react-router-dom"
import Home from './Home'
import MyLikes from './MyLikes'
import MyBookmarks from './MyBookmarks'
import MyPosts from './MyPosts'
import MyProfile from './MyProfile'
import Authentication from './Authentication'


export default function Pages() {
  return (
    <ReactRoutes>
        <Route path="/" element={<Home />} />
        <Route path="myLikes" element={<MyLikes />} />
        <Route path="myBookmarks" element={<MyBookmarks />} />
        <Route path="myPosts" element={<MyPosts />} />
        <Route path="myProfile" element={<MyProfile />} />
        <Route path="authentication" element={<Authentication />} />
    </ReactRoutes>
  )
}
