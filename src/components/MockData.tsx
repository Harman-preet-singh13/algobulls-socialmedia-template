import Mock from "mockjs";
import { useEffect, useState } from "react";

interface Comment {
  id: number;
  text: string;
  user: {
    name: string;
    profileImage: string;
  };
}

interface Post {
  id: number;
  text: string;
  likes: number;
  bookmarks: number;
  comments: Comment[];
}

interface User {
  id: number;
  name: string;
  profileImage: string;
  posts: Post[];
}

export default function MockData() {

  const [data, setData] = useState<{ users: User[] }>({ users: [] });
  
  
  useEffect(() => {
    const generateMockData = () => {
      const users: User[] = [];

      for (let i = 1; i <= 10; i++) {
        const user: User = {
          id: i,
          name: Mock.mock('@name') as string,
          profileImage: Mock.mock('@image("100x100")') as string,
          posts: [],
        };

        for (let j = 1; j <= 1; j++) {
          const post: Post = {
            id: i * 100 + j,
            text: Mock.mock('@sentence') as string,
            likes: Mock.mock('@integer(10, 100)') as number,
            bookmarks: Mock.mock('@integer(5, 30)') as number,
            comments: generateComments(),
          };
          user.posts.push(post);
        }

        users.push(user);
      }

      return { users };
    };

    const generateComments = (): Comment[] => {
      const comments: Comment[] = [];

      for (let k = 1; k <= 3; k++) {
        const comment: Comment = {
          id: k,
          text: Mock.mock('@sentence') as string,
          user: {
            name: Mock.mock('@name') as string,
            profileImage: Mock.mock('@image("50x50")') as string,
          },
        };
        comments.push(comment);
      }

      return comments;
    };

    setData(generateMockData());
  }, []); 

  const mockData = data;

  return mockData;
}
