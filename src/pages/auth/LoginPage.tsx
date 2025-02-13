import { authService } from '@api/services/auth';
import { ROUTES } from '@constants/routes';
import useModal from '@hooks/useModal';
import { useMutation } from '@tanstack/react-query';
import type { LoginReq } from '@type/requests/auth';
import Button from '@ui/components/button/Button';
import PageLayout from '@ui/layouts/PageLayout';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const { openDialog } = useModal();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginReq>({
    email: 'admin@admin.com',
    password: '1234',
  });
  const navigate = useNavigate();

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };
  const { isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: () => authService.login(loginData),
    onSuccess: () => navigate(`${ROUTES.PAYMENT.QR}`),
    onError: async (e) => {
      openDialog('alert', {
        title: '로그인 실패',
        description: (
          <div>
            <p>{e.message}</p>
          </div>
        ),
      });
    },
  });

  return (
    <PageLayout className='flex flex-col items-center justify-center'>
      <img src='/logo.png' className='w-24' alt='Logo' />

      <div className='w-[356px] flex flex-col'>
        <div className='pt-16' />

        <input
          type='email'
          name='email'
          placeholder='Email'
          value={loginData.email}
          onChange={onChangeValue}
          className='bg-[#f6f6f6] border border-[#e8e8e8] outline-none h-12 rounded-md pl-4'
        />

        <div role='separator' className='pt-4' />

        <div className='relative'>
          <input
            type={isShow ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            value={loginData.password}
            onChange={onChangeValue}
            className='bg-[#f6f6f6] border border-[#e8e8e8] outline-none h-12 rounded-md pl-4 w-full'
          />
          <span
            className='absolute right-2 top-1/2 transform -translate-y-1/2 text-[#18a0fb] cursor-pointer'
            onClick={() => setIsShow((prev) => !prev)}
          >
            {isShow ? 'Hide' : 'Show'}
          </span>
        </div>

        <div role='separator' className='pt-4' />

        <p className='text-center'>
          <Link to='/signup' className='hover:underline hover:text-blue-500'>
            아직 회원이 아닌가요?
          </Link>
        </p>

        <div role='separator' className='pt-4' />

        <Button
          size={'extraLarge'}
          disabled={
            loginData.email.length === 0 || loginData.password.length === 0
          }
          isPending={isPending}
          rounded
          onClick={() => {
            navigate(`${ROUTES.PAYMENT.QR}`);
          }}
        >
          로그인
        </Button>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
