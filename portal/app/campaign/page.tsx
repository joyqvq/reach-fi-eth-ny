'use client';
import { useState, useRef } from 'react';
import { messageDapp } from '../../lib/chatDapp';
import { SyntheticEvent } from 'react';


export default function CampaignPage() {
  const [campaignName, setCampaignName] = useState('');
  const [shouldBeHuman, setShouldBeHuman] = useState(false);
  const [selectedDapp, setSelectedDapp] = useState('dapp1');
  const [message, setMessage] = useState('');
  const formRef = useRef(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (selectedDapp != 'ReachFi') {
      throw new Error("Only ReachFi is supported right now");
    }


    let dappAddr = "0xDBc93E34bAf28d2f92FB931A44705b700B8820A2";

    // Send a message to the dapp!
    messageDapp("0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5", dappAddr, message)



    // Do something with the form data
    console.log({ campaignName, shouldBeHuman, selectedDapp, message });
  };

  
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <form ref={formRef} onSubmit={handleSubmit}>
        <input className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value) } placeholder="Campaign Name" />
        <input className="h-10 block rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" type="checkbox" checked={shouldBeHuman} onChange={() => setShouldBeHuman(!shouldBeHuman)} /> Should be human
        <select className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={selectedDapp} onChange={(e) => setSelectedDapp(e.target.value)}>
          <option value="Uniswap">Uniswap</option>
          <option value="friend.tech">friend.tech</option>
          <option value="Blur">Blur</option>
          <option value="ReachFi">ReachFi</option>
        </select>
        <input className="h-10 block w-full rounded-md border border-gray-200 pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message" />
        <button type="submit">Submit</button>
      </form>
    </main>
    );
  }
  