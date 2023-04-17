import React, { useContext } from 'react'
import { Avatar } from '@mui/material'
import Links from '../PageComponents/Links';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { AppContext } from '../../context/AppContext';

const Preview = ({ currentUser }) => {
    console.log(currentUser)

  return (
    <div className="preview">
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
              src={currentUser?.profileImg}
              className="profile__img"
              sx={{ width: 140, height: 140 }}
            />
            <div className="profile__name">{currentUser?.username}</div>
            <div className="profile__bio">{currentUser?.bio}</div>
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
              { currentUser?.links?.map(link => (
                <Links text={link.text} link={link.url} />
              )) }
            </div>
          </div>
        </div>
    </div>
  )
}

export default Preview