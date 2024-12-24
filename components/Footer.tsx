import React from 'react'
import MagicButton from './ui/MagicButton'
import { FaLocationArrow } from 'react-icons/fa'
import { socialMedia } from '@/data/index'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className='w-full pb-10 mb-[100px] md:mb-5 ' id='contact'>
            
            <div className="flex flex-col items-center " >
                <a href="mailto:nagasaichilukoti71@gmail.com">
                    <MagicButton title='Let&apos;s get in touch' icon={<FaLocationArrow />} position="right" />
                </a>
            </div>
            <div className='flex mt-16 md:flex-row flex-col justify-between items-center '>
                <p className='md:text-base text-sm md:font-normal font-light'>Copyright &copy; 2024 Nagasai</p>
                <div className='flex items-center md:gap-3 gap-6'>
                    {socialMedia.map((profile) => (
                        <div key={profile.id} className='w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 border border-black-300 rounded-lg'>
                            <Link href={profile.link}><img src={profile.img} alt='img' width={20} height={20} /></Link>

                        </div>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer