import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { DIV, FORM } from './SettingsStyle';
import Button from '@atoms/Button';
import InputBox from '@molecules/InputBox';
import Image from 'next/image';
import { UserResponse } from '@app/services/user/userApi';
import NotFound from '@src/pages/404';
import { IUserUpdateInfo } from './SettingsContainer';
import CameraIcon from '@icons/CameraIcon';
import PageTitle from '@atoms/PageTitle';
import FormButton from '@molecules/FormButton';
import PageFrame from '@templates/PageFrame';
import Modal from '@modals/Modal';
import XMarkIcon from '@icons/XMarkIcon';
import UserIcon from '@icons/UserIcon';
import RotateIcon from '@icons/RotateIcon';

interface Props {
  userUpdateInfo: IUserUpdateInfo;
  userData?: UserResponse;
  fileObj?: File;
  fileUrl: string;
  setFileUrl: (fileUrl: string) => void;
  isUpdatingUserData: boolean;
  isUpdatingUserInfo: boolean;
  userUpdateSuccess: boolean;
  settingErrMsg: string;
  UserUpdateErr: any;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClickUpload: () => void;
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeAvatar: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickDeleteImg: () => void;
  onClickRestoreImg: () => void;
  isToggled: boolean;
}

const SettingsPresenter = ({
  userUpdateInfo,
  userData,
  fileObj,
  fileUrl,
  setFileUrl,
  isUpdatingUserData,
  isUpdatingUserInfo,
  userUpdateSuccess,
  settingErrMsg,
  UserUpdateErr,
  isModalOpen,
  setModalOpen,
  onSubmit,
  onClickUpload,
  onChangeInput,
  onChangeAvatar,
  onClickDeleteImg,
  onClickRestoreImg,
  isToggled,
}: Props) => {
  const { nickname, avatar, email, old_password, new_password, cf_new_password } = userUpdateInfo;
  const [isOldPasswordType, setOldPasswordType] = useState(false);
  const [isNewPasswordType, setNewPasswordType] = useState(false);
  const [isCfNewPasswordType, setCfNewPasswordType] = useState(false);

  useEffect(() => {
    if (fileObj) {
      // console.log('만들어짐:', fileObj);
      return setFileUrl(URL.createObjectURL(fileObj));
    } else if (!fileObj && avatar && typeof avatar === 'string') {
      return setFileUrl(avatar as string);
    } else {
      setFileUrl('');
    }
  }, [fileObj, avatar, setFileUrl]);

  if (!userData?.user) return <NotFound />;
  return (
    <>
      <Head>
        <title>UYeong | Settings</title>
      </Head>
      {/* 로딩중 */}
      <PageFrame>
        <PageTitle text="Settings" />

        {/* 프로필 사진 수정 */}
        <DIV.SettingsTop>
          <div className="settings-user-avatar-wrapper settings-user-avatar">
            {/* Ani 적용을 위해 "!" 단위 분리 */}
            {fileUrl && (
              <Image
                className="settings-user-avatar"
                src={fileUrl}
                onLoad={() => {
                  // console.log('지워짐:', fileUrl);
                  URL.revokeObjectURL(fileUrl);
                }}
                alt="user avater"
                width={100}
                height={100}
                priority
              />
            )}
            {!fileUrl && (
              <>
                <UserIcon />
              </>
            )}
          </div>

          <DIV.SettingsTopBtns>
            <button onClick={onClickUpload}>
              <CameraIcon />
              <span>Upload</span>
              <input type="file" name="file" accept=".jpg, .jpeg, .png, .gif" onChange={onChangeAvatar} />
            </button>

            <DIV.ToggleBtnWrapper>
              {/* Ani 적용을 위해 "!" 단위 분리 */}
              {!isToggled && (
                <button onClick={onClickDeleteImg} disabled={fileObj || avatar ? false : true}>
                  <XMarkIcon />
                </button>
              )}
              {isToggled && (
                <button onClick={onClickRestoreImg}>
                  <RotateIcon />
                </button>
              )}
            </DIV.ToggleBtnWrapper>
          </DIV.SettingsTopBtns>
        </DIV.SettingsTop>

        {/* 정보 수정하기 */}
        <FORM.SettingsMainForm onSubmit={onSubmit}>
          <h3>Personal Information</h3>
          <div>
            <InputBox labelText="Nickname" name="nickname" value={nickname} onChange={onChangeInput} />
          </div>
          <div>
            <InputBox labelText="Email" type="email" name="email" defaultValue={email} disabled />
          </div>

          <h3>Password</h3>
          <div>
            <InputBox
              labelText="Current password"
              name="old_password"
              type={!isOldPasswordType ? 'password' : 'text'}
              value={old_password}
              onChange={onChangeInput}
            />
            <Button
              variant="primary"
              text={!isOldPasswordType ? 'Show' : 'Hide'}
              type="button"
              onClick={() => setOldPasswordType(!isOldPasswordType)}
              disabled={old_password ? false : true}
            />
          </div>
          <div>
            <InputBox
              labelText="New password"
              name="new_password"
              type={!isNewPasswordType ? 'password' : 'text'}
              value={new_password}
              onChange={onChangeInput}
            />
            <Button
              variant="primary"
              text={!isNewPasswordType ? 'Show' : 'Hide'}
              type="button"
              onClick={() => setNewPasswordType(!isNewPasswordType)}
              disabled={new_password ? false : true}
            />
          </div>
          <div>
            <InputBox
              labelText={'Confirm \n new password'}
              name="cf_new_password"
              type={!isCfNewPasswordType ? 'password' : 'text'}
              value={cf_new_password}
              onChange={onChangeInput}
            />
            <Button
              variant="primary"
              text={!isCfNewPasswordType ? 'Show' : 'Hide'}
              type="button"
              onClick={() => setCfNewPasswordType(!isCfNewPasswordType)}
              disabled={cf_new_password ? false : true}
            />
          </div>

          <FormButton variant="update" text="UPDATE" formIsLoading={isUpdatingUserInfo || isUpdatingUserData} />

          {(settingErrMsg || UserUpdateErr) && (
            <DIV.ErrMsg>{settingErrMsg ? settingErrMsg : UserUpdateErr.data.msg}</DIV.ErrMsg>
          )}
        </FORM.SettingsMainForm>

        {userUpdateSuccess && (
          <Modal type="alert" msg="Update successfully completed!" isOpen={isModalOpen} setOpen={setModalOpen} />
        )}
      </PageFrame>
    </>
  );
};

export default SettingsPresenter;