import { ProCard } from "@ant-design/pro-components";
import useAuthentication from "../customHook/isUserSignedIn";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const navigate = useNavigate();

  const { isUserSignedIn } = useAuthentication();

  const redirectPageAuth = () => {
    navigate("/authentication");
  };

  const userProfile = [
    {
      id: 1,
      name: "Harmanpreet Singh",
      profileImage:
        "https://static.wixstatic.com/media/fd9040_43baf54490c84ae6aa21e649f6681e85~mv2.jpg/v1/crop/x_0,y_0,w_1672,h_1672/fill/w_205,h_205,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/crop2.jpg",
      about:
        "I'm from Jalandhar, Punjab. My aspiration is to explore different corners of the world and eventually launch my own business. Currently, I'm on the lookout for job opportunities or internships in web development.In the realm of web development, I specialize in React.js, Next.js, Node.js, TypeScript, JavaScript, HTML, and CSS.Outside of the professional sphere, my interests include reading, weight lifting, traveling, and indulging in some anime watching.",
    },
  ];

  return (
    <>
      {isUserSignedIn ? (
        <div className="flex justify-center">
          <ProCard
            bordered
            size="small"
            style={{ maxWidth: 400, marginBlockStart: 24, padding: 10 }}
          >
            <div className="">
              {userProfile.map((profile, index) => {
                return (
                  <div key={index}>
                    <img
                      src={profile.profileImage}
                      className="w-32 mx-auto border rounded-full"
                      alt="profileImage"
                    />
                    <h1 className="text-center font-semibold">
                      {profile.name}
                    </h1>
                    <p className="my-2 leading-6">{profile.about}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-right">
              <button className=" px-2 py-1 border border-blue-900 rounded-lg text-blue-800 font-semibold hover:bg-blue-700 hover:text-white">
                Edit
              </button>
            </div>
          </ProCard>
        </div>
      ) : (
        <div>
          <h1 className="text-lg font-semibold">
            User is not signed in. Please sign in first.
          </h1>
          <button
            onClick={redirectPageAuth}
            className="px-2 py-2 border border-blue-900 rounded-lg text-blue-800 font-semibold hover:bg-blue-700 hover:text-white"
          >
            Sign in Now
          </button>
        </div>
      )}
    </>
  );
}
