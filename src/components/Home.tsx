import React, { useState } from "react";
import { ProCard } from "@ant-design/pro-components";
import {
  HeartOutlined,
  HeartFilled, 
  BookOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import useAuthentication from "../customHook/isUserSignedIn";
import Data from "../components/Data.json";

interface Post {
  id: number;
  text: string;
  likes: number;
  isLikedByYou: boolean;
  bookmarks: number;
  comments?: {
    id: number;
    text: string;
    user: { name: string; profileImage: string };
  }[];
}

interface User {
  id: number;
  name: string;
  profileImage: string;
  posts: Post[];
}

export default function Home() {
  const [newPostText, setNewPostText] = useState("");
  const [user, setUser] = useState<User>({
    id: 1,
    name: "Harmanpreet Singh",
    profileImage:
      "https://static.wixstatic.com/media/fd9040_43baf54490c84ae6aa21e649f6681e85~mv2.jpg/v1/crop/x_0,y_0,w_1672,h_1672/fill/w_205,h_205,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/crop2.jpg",
    posts: Data.users[0].posts,
  });

  const [data, setData] = useState<User[]>(Data.users);
  const [userPosts, setUserPosts] = useState<Post[]>([]);


  const addPost = (userId: number) => {
    const newPost: Post = {
      id: Date.now(),
      text: newPostText,
      likes: 0,
      isLikedByYou: false,
      bookmarks: 0,
    };

    setUserPosts((prevPosts) => [...prevPosts, newPost]);

    console.log(newPost);

    setNewPostText("");
  };

  const handleLike = (userId: number, postId: number) => {
    if (userId === user.id) {
      setData((prevData) =>
        prevData.map((userData) =>
          userData.id === userId
            ? {
                ...userData,
                posts: userData.posts.map((post) =>
                  post.id === postId
                    ? {
                        ...post,
                        likes: post.likes + (post.isLikedByYou ? -1 : 1),
                        isLikedByYou: !post.isLikedByYou,
                      }
                    : post
                ),
              }
            : userData
        )
      );
    }
  };



  const { isUserSignedIn } = useAuthentication();

  return (
    <>
      {isUserSignedIn ? (
        <div className="my-5">
          <ProCard bordered>
            <form>
              <img
                src={user.profileImage}
                alt="user's profile"
                className=" w-8 float-left bg-cover rounded-full"
              />
              <h2 className="text-slate-950 font-semibold">{user.name}</h2>

              <textarea
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="mt-4 bg-zinc-200 w-full px-2 py-2 rounded-xl"
                placeholder="What's going on?"
                required
                maxLength={200}
              />
              <div className="text-center mt-2">
                <button
                  type="button"
                  onClick={() => addPost(user.id)}
                  className="px-2 py-1 border border-slate-700 rounded-lg font-semibold
            hover:bg-blue-800 hover:text-white
            "
                >
                  Add Post
                </button>
              </div>
            </form>
          </ProCard>
        </div>
      ) : (
        <div></div>
      )}

      {/* users posts data */}
      <div>
        {userPosts.map((post, index) => {
          return (
            <ProCard key={index} bordered>
              <section className="flex gap-2">
                <div className="">
                  <img
                    src={user.profileImage}
                    alt="user's profile"
                    className=" w-14 float-left bg-cover rounded-full"
                  />
                </div>
                <div>
                  <h1 className="  text-slate-950 font-semibold">
                    {user.name}
                  </h1>

                  {userPosts.map((posts, index) => {
                    return (
                      <div className="mt-2" key={index}>
                        <p>{posts.text}</p>
                        <div className="">
                          <div className="mt-2 flex gap-2">
                            <p className="flex gap-1">
                              <HeartOutlined />
                              {posts.likes}
                            </p>
                            <p className="flex gap-1">
                              <BookOutlined />
                              {posts.bookmarks}
                            </p>
                            <p className="flex gap-1">
                              <CommentOutlined />
                              {posts.bookmarks}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </ProCard>
          );
        })}
      </div>

      {data.map((data, index) => {
        return (
          <ProCard key={index} bordered>
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
                          onClick={() => handleLike(user.id, posts.id)}
                          className="flex gap-1"
                        >
                          {posts.isLikedByYou ? <HeartFilled className="text-red-500 mt-1" /> : <HeartOutlined className="mt-1"/>}
                          {posts.likes} 
                        </button>
                        <p className="flex gap-1">
                          <BookOutlined />
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
        );
      })}
    </>
  );
}
