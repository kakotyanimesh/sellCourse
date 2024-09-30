import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons' 

const Footer = () => {
  return (
    <div className='flex justify-between items-center sm:mt-56 mt-48 px-10 sm:px-56'>
        <div>
            <h1 className='sm:text-3xl text-xl font-bold'>Edu-Nexus</h1>
            <p className="pt-1 sm:text-xl text-xs">`{"pathetic".toUpperCase()}` UI(😭😭).</p> 
            {/* i know the upper case thing but i like it over coding lol  */}

        </div>
        <div>
            <h1 className='sm:text-3xl text-xl'>Social links</h1>
            <div className='flex justify-between pt-1 '>
                <span>
                    <a href="https://github.com/kakotyanimesh/sellCourse" target='_blanck'>
                        <FontAwesomeIcon icon={faGithub} sm:size='xl' />
                    </a>   
                </span>
                <span>
                    <a href="https://twitter.com/_animeshkakoty" target='_blanck'>
                        <FontAwesomeIcon icon={faTwitter} sm:size='xl' />
                    </a>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Footer