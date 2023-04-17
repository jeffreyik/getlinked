import React from 'react'

const Links = ({ text, link }) => {
  return (
    <a href={`https://${link}`} target='_blank' className="profile__link">{ text }</a>
  )
}

export default Links