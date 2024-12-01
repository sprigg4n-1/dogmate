'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainContainer from '../common/MainContainer';
import Link from 'next/link';

import { signIn, signOut } from 'next-auth/react';

enum UserRole {
  'user' = 'user',
  'worker' = 'worker',
}

const AuthorizationSection = () => {
  const router = useRouter();

  const [loginAs, setLoginAs] = useState(UserRole.user);
  const [registerAs, setRegisterAs] = useState(UserRole.user);

  const [isLogin, setIsLogin] = useState(true);

  // for login
  const [confirmPass, setConfirmPass] = useState('');
  const [confirmInputText, setConfirmInputText] = useState('');

  // for register
  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [sex, setSex] = useState('');

  const onHandleChangeLogin = (
    e: React.MouseEvent<HTMLButtonElement>,
    state: boolean
  ) => {
    e.preventDefault();
    setIsLogin(state);
  };

  const onHandleChangeLoginRole = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoginAs(loginAs === UserRole.user ? UserRole.worker : UserRole.user);
  };

  const onHandleChangeRegisterRole = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    setRegisterAs(
      registerAs === UserRole.user ? UserRole.worker : UserRole.user
    );
  };

  const onHandleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        confirmInputText,
        confirmPass,
        redirect: false,
      });

      if (res?.error) {
        console.log(res.error);
        return;
      }

      router.replace('/');
    } catch (e) {
      throw new Error('Error with login');
    }
  };

  const onHandleSubmitRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      if (password === rePassword) {
        const resUserEx = await fetch('/api/userExists', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            inputText,
          }),
        });

        const { user } = await resUserEx.json();

        if (user) {
          alert('Nickname exists');
          setInputText('');
        } else {
          const res = await fetch(`/api/register`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              email: registerAs === 'worker' ? inputText : '',
              nickname: registerAs === 'user' ? inputText : '',
              password,
              name,
              surname,
              age: date,
              sex,
              role: registerAs,
              description: '',
              isVerified: false,
            }),
          });

          res.status === 201 && setIsLogin(true);
        }
      } else {
        setPassword('');
        setRePassword('');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <MainContainer>
        <div className="py-[100px]">
          <h1 className="font-itim text-[45px] font-medium mb-[50px] text-accYellow">
            DogMate
          </h1>

          <div
            className={`${
              isLogin ? 'flex flex-row-reverse' : 'flex flex-row-reverse'
            } justify-between items-center `}>
            <div className="flex flex-col gap-[70px] w-[700px]">
              <h2 className="text-[55px] font-medium text-mainDark">
                Welcome to DogMate
              </h2>

              <p className="max-w-[660px] text-[19px] font-light">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries
              </p>
            </div>

            <div>
              {isLogin ? (
                <form
                  className="flex flex-col w-[500px] gap-[30px]"
                  onSubmit={(e) => onHandleSubmitLogin(e)}>
                  <label className="text-mainBlack text-[23px]">
                    Login as {loginAs} /{' '}
                    <button
                      className="italic text-accYellow"
                      onClick={(e) => onHandleChangeLoginRole(e)}>
                      switch to{' '}
                      {loginAs === UserRole.user
                        ? UserRole.worker
                        : UserRole.user}
                    </button>
                  </label>
                  <input
                    className="rounded-xl border-mainDark border-2 text-mainDark placeholder:text-mainDark text-[20px] py-3 px-2 outline-accYellow"
                    required
                    type={loginAs === UserRole.user ? 'text' : 'email'}
                    placeholder={
                      loginAs === UserRole.user
                        ? 'Write nickname'
                        : 'Write email'
                    }
                    value={confirmInputText}
                    onChange={(e) => setConfirmInputText(e.target.value)}
                  />
                  <input
                    className="rounded-xl border-mainDark border-2 text-mainDark placeholder:text-mainDark text-[20px] py-3 px-2 outline-accYellow"
                    required
                    type="password"
                    placeholder="Write password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <Link
                      className="text-[18px] underline text-mainDark"
                      href="/">
                      Forgot password?
                    </Link>
                    <button
                      className="bg-accYellow px-10 py-2 rounded-lg text-white font-bold hover:bg-yellow-400 duration-300"
                      type="submit">
                      Log in
                    </button>
                  </div>
                </form>
              ) : (
                <form
                  className="flex flex-col w-[500px] gap-[15px]"
                  onSubmit={(e) => onHandleSubmitRegister(e)}>
                  <label className="text-mainBlack text-[23px]">
                    Register as {registerAs} /{' '}
                    <button
                      className="italic text-accYellow"
                      onClick={(e) => onHandleChangeRegisterRole(e)}>
                      switch to{' '}
                      {registerAs === UserRole.user
                        ? UserRole.worker
                        : UserRole.user}
                    </button>
                  </label>

                  <input
                    className="rounded-xl border-mainDark border-2 text-mainDark placeholder:text-mainDark text-[20px] py-1 px-2 outline-accYellow"
                    required
                    type={registerAs === UserRole.user ? 'text' : 'email'}
                    placeholder={
                      registerAs === UserRole.user
                        ? 'Write nickname'
                        : 'Write email'
                    }
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <input
                    className="rounded-xl border-mainDark border-2 text-mainDark placeholder:text-mainDark text-[20px] py-1 px-2 outline-accYellow"
                    required
                    type="password"
                    placeholder="Write password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className="rounded-xl border-mainDark border-2 text-mainDark placeholder:text-mainDark text-[20px] py-1 px-2 outline-accYellow"
                    required
                    type="password"
                    placeholder="Confirm password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                  />
                  <div className="flex justify-between gap-5">
                    <input
                      className="rounded-xl border-mainDark border-2 text-mainDark placeholder:text-mainDark text-[20px] py-1 px-2 outline-accYellow w-1/2"
                      required
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      className="rounded-xl border-mainDark border-2 text-mainDark placeholder:text-mainDark text-[20px] py-1 px-2 outline-accYellow w-1/2"
                      required
                      type="text"
                      placeholder="Surname"
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between gap-5">
                    <input
                      className="rounded-xl border-mainDark border-2 text-mainDark placeholder:text-mainDark text-[20px] py-1 px-2 outline-accYellow w-1/2"
                      required
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <select
                      className="rounded-xl border-mainDark border-2 text-mainDark placeholder:text-mainDark text-[20px] py-1 px-2 outline-accYellow w-1/2"
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}>
                      <option value="">select sex</option>
                      <option value="man">man</option>
                      <option value="woman">woman</option>
                    </select>
                  </div>

                  <button
                    className="bg-accYellow px-10 py-2 rounded-lg text-white font-bold hover:bg-yellow-400 duration-300"
                    type="submit">
                    Register
                  </button>
                </form>
              )}
              <div className="w-full bg-lightGray rounded-xl overflow-hidden flex justify-between mt-10">
                <button
                  onClick={(e) => onHandleChangeLogin(e, false)}
                  className={`w-1/2 text-center py-5 rounded-xl text-[20px] font-medium  ${
                    !isLogin ? 'bg-lightGreen text-white' : 'text-black'
                  }`}>
                  Sign up
                </button>
                <button
                  onClick={(e) => onHandleChangeLogin(e, true)}
                  className={`w-1/2 text-center py-5 rounded-xl text-[20px] font-medium ${
                    isLogin ? 'bg-lightGreen text-white ' : 'text-black'
                  }`}>
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default AuthorizationSection;
