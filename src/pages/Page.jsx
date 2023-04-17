import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "./Error";
import Loading from "../components/Loading/Loading";
import { AppContext } from "../context/AppContext";
import { Avatar } from "@mui/material";
import coverImg from "../assets/cover.jpg";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Links from "../components/PageComponents/Links";

const Page = () => {
  const { users } = useContext(AppContext);
  const { userID } = useParams();
  const navigate = useNavigate()
  const username = users?.data?.find((user) => user?.username === userID);
  console.log(username);

  return (
    <>
    {users?.loading ? <Loading/> : !username ? (
        navigate('/404')
      ) : (
        <div className="profile">
          <div
            className="profile__coverImg"
            style={{
              backgroundImage: {},
              backgroundColor: '#bdbdbd',
            }}
          ></div>
          <div className="profile__container">
            <Avatar
              src={username?.profileImg}
              className="profile__img"
              sx={{ width: 140, height: 140 }}
            />
            <div className="profile__name">{username?.username}</div>
            <div className="profile__bio">{username?.bio}</div>
            <div className="profile__socialLinks">
              <InstagramIcon />
              <TwitterIcon />
              <GitHubIcon />
              <LinkedInIcon />
            </div>
            <div className="profile__links">
              {/* <div className="profile__link">My portfolio</div>
              <div className="profile__link">Join my Newsletter</div>
              <div className="profile__link">Contact me</div>
              <div className="profile__link">Resume</div> */}
              { username?.links?.map(link => (
                <Links text={link.text} link={link.url} />
              )) }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
