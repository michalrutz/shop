"use client"
import React from 'react';
import './Navigation.css'; // Import your CSS file for styling
import Link from 'next/link';
import Image from 'next/image';

export default function HoverMenu(props:any) {
  const {user} = props;

  return (
    <div className="navigation">
        <div className="dropdown">
          <button className="dropbtn">          
          <Link href="/protected/client" className="flex flex-row justify-between items-center">
              <Image
                className="w-8 h-8 rounded-full"
                src={ user.image as string } // Route of the image file
                height={128} // Desired size with correct aspect ratio
                width={128} // Desired size with correct aspect ratio
                alt="Your Name"
              />
          </Link></button>
          <div className="dropdown-content">
            <Link href="/protected/client">Account</Link>
            <Link href="/api/auth/signout">Sign Out</Link>
          </div>
        </div>
    </div>
  );
}

