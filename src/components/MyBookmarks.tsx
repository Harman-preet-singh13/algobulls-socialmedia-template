import React from 'react'
import Data from "../components/Data.json";
import { ProCard } from '@ant-design/pro-components';
import useAuthentication from '../customHook/isUserSignedIn';
import {
  HeartFilled ,

  BookFilled,
  CommentOutlined,
} from "@ant-design/icons";
import {  useNavigate } from 'react-router-dom';

export default function MyBookmarks() {
  const navigate = useNavigate();

  const limitedData = Data.users.slice(0,5);
  const { isUserSignedIn } = useAuthentication();

  const redirectPageAuth = () => {
    navigate('/authentication')
  }

  return (
    <>
    
    {isUserSignedIn 
    ?(<div>
      {limitedData.map((data, index)=> {

        return(
          <ProCard bordered key={index}>
                        <section className="flex gap-2">
              <div className="">
                <img
                  src={data.profileImage}
                  alt="user's profile"
                  className=" w-14 float-left bg-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="  text-slate-950 font-semibold">{data.name}</h1>

                {data.posts.map((posts, index) => {
                  return (
                    <div className="mt-2" key={index}>
                      <p>{posts.text}</p>
                    </div>
                  );
                })}

                {data.posts.map((posts, index) => {
                  return (
                    <div key={index} className="">
                      <div className="mt-2 flex gap-2">
                        <button
                         
                          className="flex gap-1"
                        >
                          {<HeartFilled className="text-red-500 mt-1"/>}
                          {posts.likes} 
                        </button>
                        <p className="flex gap-1">
                          <BookFilled className="text-blue-950" />
                          {posts.bookmarks}
                        </p>
                        <p className="flex gap-1">
                          <CommentOutlined />
                          {posts.bookmarks}
                        </p>
                      </div>
                      <div>
                        {/* {posts.comments.map((comment, index)=>{
                          return(
                              <div key={index} className="">
                                  {}
                              </div>
                          )
                      })} */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </ProCard>
        )
      })}
    </div>)
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
