interface userUpdateInfoProps {
  avatar: string | File | undefined;
  nickname: string | undefined;
  email: string | undefined;
  old_password: string;
  new_password: string;
  cf_new_password: string;
}

interface userDataProps {
  nickname: string;
}

const valid = (userUpdateInfo: userUpdateInfoProps, userData: userDataProps | undefined) => {
  const { avatar, nickname, email, old_password, new_password, cf_new_password } = userUpdateInfo;

  const userNickname = userData?.nickname;

  //nickname 에러
  if (!nickname) return 'Please add your nickname.';
  else if (nickname.length < 2 || nickname.length > 10) return 'Your nickname must be between 2 and 10 characters.';

  //email 에러
  if (!email) return 'Please add your email.';

  //old_password 에러
  if (0 < old_password.length && old_password.length < 6) return 'Your old password must be 6 chars or more.';

  //new_password 에러
  if (0 < new_password.length && new_password.length < 6) return 'Your new password must be 6 chars or more.';

  //cf_new_password 에러
  if (new_password !== cf_new_password) return 'Your new password and confirm new password should be same.';

  //변경 된게 없을때
  if (!avatar && nickname && nickname === userNickname && email && !old_password && !new_password && !cf_new_password)
    return 'Already up to date';

  //password 입력 에러
  //(다 있는상태 외 나머지 와 다 없는상태 외 나머지 의 합집합)
  if (!(old_password && new_password && cf_new_password) && !(!old_password && !new_password && !cf_new_password))
    return 'Please add all password field';

  //password 일치 에러
  if (old_password && new_password && old_password === new_password)
    return 'Your old password and new password are same';

  return '';
};

export default valid;