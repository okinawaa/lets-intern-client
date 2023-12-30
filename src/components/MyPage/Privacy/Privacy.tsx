import { useEffect, useState } from 'react';

import axios from '../../../libs/axios';
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
} from '../../../libs/valid';
import MainInfo from './MainInfo';
import PasswordChange from './PasswordChange';
import SubInfo from './SubInfo';

import './Privacy.scss';

const Privacy = () => {
  const [mainInfoValues, setMainInfoValues] = useState<any>({});
  const [subInfoValues, setSubInfoValues] = useState<any>({});
  const [passwordValues, setPasswordValues] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [initialValues, setInitialValues] = useState<any>({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get('/user');
        setMainInfoValues({
          name: res.data.name,
          email: res.data.email,
          phoneNum: res.data.phoneNum,
        });
        setSubInfoValues({
          major: res.data.major,
          university: res.data.university,
        });
        setInitialValues({
          name: res.data.name,
          email: res.data.email,
          phoneNum: res.data.phoneNum,
          major: res.data.major,
          university: res.data.university,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const resetInitialValues = () => {
    setInitialValues({
      name: mainInfoValues.name,
      email: mainInfoValues.email,
      phoneNum: mainInfoValues.phoneNum,
      major: subInfoValues.major,
      university: subInfoValues.university,
    });
  };

  const handleChangeMainInfo = (e: any) => {
    const { name, value } = e.target;
    setMainInfoValues({
      ...mainInfoValues,
      [name]: value,
    });
  };

  const handleSaveMainInfo = async (e: any) => {
    e.preventDefault();
    let hasNull: boolean = false;
    const newValues = { ...mainInfoValues };
    Object.keys(newValues).forEach((key) => {
      if (!newValues[key]) {
        hasNull = true;
        return;
      }
    });
    if (hasNull) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    Object.keys(newValues).forEach((key) => {
      if (newValues[key] === initialValues[key]) {
        delete newValues[key];
      }
    });
    if (Object.keys(newValues).length === 0) {
      alert('변경된 내용이 없습니다.');
      return;
    }
    if (!isValidEmail(mainInfoValues.email)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }
    if (!isValidPhoneNumber(mainInfoValues.phoneNum)) {
      alert('휴대폰 번호 형식이 올바르지 않습니다.');
      return;
    }
    try {
      await axios.patch('/user', newValues);
      alert('유저 정보가 변경되었습니다.');
      resetInitialValues();
    } catch (error) {
      if ((error as any).response.status === 400) {
        alert('이미 존재하는 이메일입니다.');
        return;
      }
      alert('유저 정보 변경에 실패했습니다.');
    }
  };

  const handleChangeSubInfo = (e: any) => {
    const { name, value } = e.target;
    setSubInfoValues({
      ...subInfoValues,
      [name]: value,
    });
  };

  const handleSaveSubInfo = async (e: any) => {
    e.preventDefault();
    let hasNull: boolean = false;
    const newValues = { ...subInfoValues };
    Object.keys(newValues).forEach((key) => {
      if (!newValues[key]) {
        hasNull = true;
        return;
      }
    });
    if (hasNull) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    Object.keys(newValues).forEach((key) => {
      if (newValues[key] === initialValues[key]) {
        delete newValues[key];
      }
    });
    if (Object.keys(newValues).length === 0) {
      alert('변경된 내용이 없습니다.');
      return;
    }
    try {
      await axios.patch('/user', newValues);
      alert('유저 정보가 변경되었습니다.');
      resetInitialValues();
    } catch (error) {
      alert('유저 정보 변경에 실패했습니다.');
    }
  };

  const handleChangePassword = (e: any) => {
    const { name, value } = e.target;
    setPasswordValues({
      ...passwordValues,
      [name]: value,
    });
  };

  const handleSavePassword = async (e: any) => {
    e.preventDefault();
    if (
      !passwordValues.currentPassword ||
      !passwordValues.newPassword ||
      !passwordValues.newPasswordConfirm
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    if (passwordValues.newPassword === passwordValues.currentPassword) {
      alert('기존 비밀번호와 동일한 비밀번호입니다.');
      return;
    }
    if (passwordValues.newPassword !== passwordValues.newPasswordConfirm) {
      alert('새로운 비밀번호가 비밀번호 확인과 일치하지 않습니다.');
      return;
    }
    if (!isValidPassword(passwordValues.newPassword)) {
      alert(
        '새로운 비밀번호의 형식이 올바르지 않습니다. (영어, 숫자, 특수문자 포함 8자 이상)',
      );
      return;
    }
    try {
      const reqData = {
        currentPassword: passwordValues.currentPassword,
        newPassword: passwordValues.newPassword,
      };
      await axios.patch('/user/password', reqData);
      alert('비밀번호가 변경되었습니다.');
      setPasswordValues({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      });
    } catch (err) {
      if ((err as any).response.status === 400) {
        alert('기존 비밀번호가 일치하지 않습니다.');
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      axios.get('/user/withdraw');
      alert('회원 탈퇴가 완료되었습니다.');
      localStorage.removeItem('access-token');
      localStorage.removeItem('refresh-token');
      window.location.href = '/';
    } catch (err) {
      alert('회원 탈퇴에 실패했습니다.');
    }
  };

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>에러 발생</div>;
  }

  return (
    <main className="privacy-page">
      <MainInfo
        mainInfoValues={mainInfoValues}
        onChangeMainInfo={handleChangeMainInfo}
        onSubmitMainInfo={handleSaveMainInfo}
        onDeleteAccount={handleDeleteAccount}
      />
      <SubInfo
        subInfoValues={subInfoValues}
        onChangeSubInfo={handleChangeSubInfo}
        onSubmitSubInfo={handleSaveSubInfo}
      />
      <PasswordChange
        passwordValues={passwordValues}
        onChangePassword={handleChangePassword}
        onSubmitPassword={handleSavePassword}
      />
    </main>
  );
};

export default Privacy;
