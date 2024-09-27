'use client';

import React, { useState } from 'react';

const SettingsTab = () => {
  const [userData, setUserData] = useState({
    nickname: 'Yukki',
    name: 'Valeria',
    surname: 'Markelova',
    sex: 'female',
    email: 'markelovav896@gmail.com',
    phone: '380666148080',
  });

  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [sex, setSex] = useState(userData.sex);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onHandleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);

    const newUserData = {
      nickname: nickname === '' ? userData.nickname : nickname,
      name: name === '' ? userData.name : name,
      surname: surname === '' ? userData.surname : surname,
      sex: sex !== userData.sex ? sex : userData.sex,
      email: email === '' ? userData.email : email,
      phone: phone === '' ? userData.phone : phone,
    };

    setUserData(newUserData);

    setNickname('');
    setName('');
    setSurname('');
    setSex(newUserData.sex);
    setEmail('');
    setPhone('');
  };

  return (
    <div className="px-58px bg-[#f1f1f1] rounded-2xl overflow-hidden flex">
      {/* tabs */}
      <ul>
        <li>
          <button className="px-[58px] py-[23px] text-[24px] text-white bg-kittenEye border-b-2 border-[#3E3E3E]">
            changing own data
          </button>
        </li>
      </ul>

      {/* forms of tab */}
      <div className="border-l-2 border-[#3E3E3E] flex-1">
        <form
          className="pb-5 pt-[54px] px-[60px] flex flex-col gap-[25px]"
          onSubmit={onHandleSubmit}>
          <label className="flex gap-[56px] items-center">
            <span className="text-[32px] text-black opacity-80 w-[145px]">
              nickname
            </span>
            <input
              className="w-[285px] py-[3px] pl-6 pr-1 text-[20px] text-black border-2 border-black rounded-lg placeholder:text-black placeholder:opacity-80"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={userData.nickname}
            />
          </label>
          <label className="flex gap-[56px] items-center">
            <span className="text-[32px] text-black opacity-80 w-[145px]">
              name
            </span>
            <input
              className="w-[285px] py-[3px] pl-6 pr-1 text-[20px] text-black border-2 border-black rounded-lg placeholder:text-black placeholder:opacity-80"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={userData.name}
            />
          </label>
          <label className="flex gap-[56px] items-center">
            <span className="text-[32px] text-black opacity-80 w-[145px]">
              surname
            </span>
            <input
              className="w-[285px] py-[3px] pl-6 pr-1 text-[20px] text-black border-2 border-black rounded-lg placeholder:text-black placeholder:opacity-80"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder={userData.surname}
            />
          </label>
          <label className="flex gap-[56px] items-center">
            <span className="text-[32px] text-black opacity-80 w-[145px]">
              sex
            </span>
            <select
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="w-[285px] py-[3px] pl-6 pr-1 text-[20px] text-black border-2 border-black rounded-lg placeholder:text-black placeholder:opacity-80">
              <option value="none">none</option>
              <option value="female">female</option>
              <option value="man">man</option>
            </select>
          </label>

          <label className="flex gap-[56px] items-center">
            <span className="text-[32px] text-black opacity-80 w-[145px]">
              email
            </span>
            <input
              className="w-[285px] py-[3px] pl-6 pr-1 text-[20px] text-black border-2 border-black rounded-lg placeholder:text-black placeholder:opacity-80"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={userData.email}
            />
          </label>

          <label className="flex gap-[56px] items-center">
            <span className="text-[32px] text-black opacity-80 w-[145px]">
              phone
            </span>
            <input
              className="w-[285px] py-[3px] pl-6 pr-1 text-[20px] text-black border-2 border-black rounded-lg placeholder:text-black placeholder:opacity-80"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={userData.phone}
            />
          </label>

          <button
            className="block w-[135px] text-center py-[6px] text-white text-[20px] tracking-widest bg-kittenEye ml-auto rounded-md"
            type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsTab;
