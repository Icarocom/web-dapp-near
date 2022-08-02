import React, { useState } from 'react';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import { CloseIcon, NearIcon } from 'components/icons';
import Metatags from 'components/Metatags';
import { Input, SwitchBox } from 'components/items/elements';
import 'swiper/css';
import { CountrySelector } from 'components/items/elements/CountrySelector';

const DEFAULT_MODAL_CLASSES = clsx('transition-all delay-300');
const HIDE_MODAL_CLASSES = clsx('hidden');

export default function Settings() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');

  const [isReceiveNotice, setReceiveNotice] = useState(true);
  const [isRedeemNotice, setRedeemNotice] = useState(true);
  const [isWeeklyUpdate, setWeeklyUpdate] = useState(false);
  const [isNewsNotice, setNewsNotice] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const settingStatus = {
    personal: 'personal',
    notification: 'notification',
  };

  const [displayedSetting, setDisplayedSetting] = useState(settingStatus.personal);

  return (
    <main>
      <Metatags title="Settings" description="Catch | Settings" />
      <div
        className={clsx(
          'flex md:hidden flex-col items-center justify-center min-h-full px-0 py-4 sm:px-6 lg:px-8 relative',
          isModalVisible ? 'hidden' : ''
        )}
      >
        <div className="flex items-center justify-center w-full">
          <Swiper
            freeMode={true}
            slidesPerView={1}
            breakpoints={{
              560: {
                slidesPerView: 3,
              },
              365: {
                slidesPerView: 2,
              },
              750: {
                slidesPerView: 3,
                width: 630,
              },
            }}
            spaceBetween={10}
            modules={[FreeMode]}
          >
            <SwiperSlide className="p-5">
              <button
                className={clsx(
                  'w-[200px] h-14 rounded-3xl bg-white shadow-lg text-body-md',
                  displayedSetting == settingStatus.personal ? 'text-primary' : 'text-darkGrey'
                )}
                onClick={() => setDisplayedSetting(settingStatus.personal)}
              >
                Personal information
              </button>
            </SwiperSlide>
            <SwiperSlide className="p-5">
              <button
                className={clsx(
                  'w-[200px] h-14 rounded-3xl bg-white shadow-lg text-body-md',
                  displayedSetting == settingStatus.notification ? 'text-primary' : 'text-darkGrey'
                )}
                onClick={() => setDisplayedSetting(settingStatus.notification)}
              >
                Notifications
              </button>
            </SwiperSlide>
            <SwiperSlide className="p-5">
              <button
                className="w-[200px] h-14 rounded-3xl bg-white shadow-lg text-error text-body-md"
                onClick={() => setIsModalVisible(true)}
              >
                Delete account
              </button>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-full px-0 py-12 sm:px-6 sm:pt-0 md:pt-12 lg:px-8 relative">
        <div className="w-full space-y-8 flex flex-col items-center">
          <div className="w-22 h-22 rounded-full bg-white border border-lightGrey flex items-center justify-center">
            <NearIcon className="w-8 h-8" />
          </div>
          <p className="mt-4 text-base text-center">sarunas.near</p>
          {displayedSetting == settingStatus.personal && (
            <div className="mt-10 w-full md:w-[472px] flex flex-col items-center px-14 md:border-l-2 border-lightGrey relative">
              <div>
                <div className="-space-y-px w-72 sm:w-80 rounded-md shadow-sm flex flex-col gap-4">
                  <Input label="First name" value={firstName} onChange={(firstName) => setFirstName(firstName)} />
                  <Input label="Last name" value={lastName} onChange={(lastName) => setLastName(lastName)} />
                  <Input label="Email address" value={email} onChange={(email) => setEmail(email)} />
                  <CountrySelector
                    className="border-darkGrey w-full rounded-lg"
                    onChange={(country: string) => {
                      setCountry(country);
                    }}
                  />
                  <Input label="Address" value={address} onChange={(address) => setAddress(address)} />
                </div>
                <button className="bg-primary hover:bg-secondary text-white w-72 sm:w-80 mt-10 py-4 rounded-lg transition-all delay-300 shadow-2xl font-bold">
                  Save
                </button>
              </div>
              <div className="hidden absolute top-0 -left-48 md:flex flex-col justify-start gap-6">
                <p
                  className="cursor-pointer text-body-md text-black"
                  onClick={() => setDisplayedSetting(settingStatus.personal)}
                >
                  Personal information
                </p>
                <p
                  className="cursor-pointer text-body-md text-darkGrey"
                  onClick={() => setDisplayedSetting(settingStatus.notification)}
                >
                  Notifications
                </p>
                <p className="cursor-pointer text-body-md text-error" onClick={() => setIsModalVisible(true)}>
                  Delete account
                </p>
              </div>
            </div>
          )}
          {displayedSetting == settingStatus.notification && (
            <div className="mt-10 w-full md:w-[472px] px-14 md:border-l-2 border-lightGrey relative">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <p className="text-body-md text-darkGrey">Notify me if some one receives my NFT</p>
                  <SwitchBox label={false} isOn={isReceiveNotice} onChange={() => setReceiveNotice(!isReceiveNotice)} />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-body-md text-darkGrey">Notify me if some one redeems my NFT</p>
                  <SwitchBox label={false} isOn={isRedeemNotice} onChange={() => setRedeemNotice(!isRedeemNotice)} />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-body-md text-darkGrey">Dashboard weekly updates</p>
                  <SwitchBox label={false} isOn={isWeeklyUpdate} onChange={() => setWeeklyUpdate(!isWeeklyUpdate)} />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-body-md text-darkGrey">Marketing & News notifications</p>
                  <SwitchBox label={false} isOn={isNewsNotice} onChange={() => setNewsNotice(!isNewsNotice)} />
                </div>
              </div>
              <div className="hidden absolute top-0 -left-48 md:flex flex-col justify-start gap-6">
                <p
                  className="cursor-pointer text-body-md text-darkGrey"
                  onClick={() => setDisplayedSetting(settingStatus.personal)}
                >
                  Personal information
                </p>
                <p
                  className="cursor-pointer text-body-md text-black"
                  onClick={() => setDisplayedSetting(settingStatus.notification)}
                >
                  Notifications
                </p>
                <p className="cursor-pointer text-body-md text-error" onClick={() => setIsModalVisible(true)}>
                  Delete account
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={clsx(DEFAULT_MODAL_CLASSES, isModalVisible ? '' : HIDE_MODAL_CLASSES)}>
        <div className="fixed top-0 left-0 w-full h-full bg-white opacity-100 sm:opacity-[98%]"></div>
        <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <div
            className="absolute w-14 h-14 bg-white rounded-full top-6 left-6 shadow-2xl sm:hidden flex items-center justify-center cursor-pointer"
            onClick={() => setIsModalVisible(false)}
          >
            <CloseIcon className="text-darkGrey" />
          </div>
          <div className="w-full h-full sm:w-80 sm:h-80 sm:shadow-2xl sm:rounded-3xl bg-white flex flex-col items-center justify-end p-6">
            <div className="flex flex-col items-center mt-auto sm:mt-0">
              <p className="text-heading-lg uppercase mt-8">delete account</p>
              <p className="text-body-md text-darkGrey text-center">
                Are you sure want to delete your account? This cannot be undone.
              </p>
            </div>
            <button className="bg-error hover:bg-black text-white w-full mt-auto sm:mt-8 py-[18px] rounded-3xl transition-all delay-300 font-bold">
              Delete
            </button>
            <button
              className="border-2 border-primary text-primary hover:text-white hover:bg-primary w-full  mt-4 py-4 rounded-3xl transition-all delay-300 font-bold"
              onClick={() => setIsModalVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
