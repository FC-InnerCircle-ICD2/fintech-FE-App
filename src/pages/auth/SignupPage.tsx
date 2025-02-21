import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ROUTES } from '@constants/routes';
import { Input } from '@lib/shadcn/components/ui/input';
import { Label } from '@lib/shadcn/components/ui/label';
import { Checkbox } from '@lib/shadcn/components/ui/checkbox';
import Button from '@ui/components/button/Button';
import PageLayout from '@ui/layouts/PageLayout';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@constants/apiEndpoints';
import type { RegisterReq } from '@type/requests/auth';
import { authService } from '@api/services/auth';
import useModal from '@hooks/useModal';
import { HTTPError } from 'ky';
import type { ApiResponseError } from '@lib/apiClient';
import { useEffect } from 'react';

// Zod 스키마 정의
const signupSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식이 아닙니다.'),
    password: z
      .string()
      .min(5, '비밀번호는 5자 이상이어야 합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        '비밀번호는 영문과 숫자를 포함해야 합니다.',
      ),
    confirmPassword: z.string(),
    agreements: z.object({
      terms: z.boolean(),
      privacy: z.boolean(),
      marketing: z.boolean(),
    }),
  })
  .refine(
    (data) =>
      data.password.length >= 0 && data.password === data.confirmPassword,
    {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
    },
  )
  .refine(
    (data) => {
      return data.agreements.terms && data.agreements.privacy;
    },
    {
      message: '필수 약관에 동의해야 합니다.',
      path: ['agreements.terms'],
    },
  );

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupPage = () => {
  const navigate = useNavigate();
  const { openDialog } = useModal();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange', // 실시간 유효성 검사
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      agreements: {
        terms: false,
        privacy: false,
        marketing: false,
      },
    },
  });

  // 약관 동의 상태 감시
  const agreements = watch('agreements');
  const password = watch('password');

  // 전체 동의 상태 계산
  const isAllChecked =
    agreements.terms && agreements.privacy && agreements.marketing;

  // 전체 동의 핸들러
  const handleAllChecked = (checked: boolean) => {
    setValue(
      'agreements',
      {
        terms: checked,
        privacy: checked,
        marketing: checked,
      },
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      },
    );
  };

  const handleAgreementChange =
    (field: keyof SignupFormData['agreements']) => (checked: boolean) => {
      const value = checked === true;
      setValue(`agreements.${field}`, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    };

  const { mutate, isPending } = useMutation({
    mutationKey: [QUERY_KEY.USER.SIGN_UP],
    mutationFn: (registerData: RegisterReq) =>
      authService.register(registerData),
    onSuccess: (res) => {
      if (res.ok) {
        openDialog('alert', {
          title: '회원가입 완료 🎉',
          description: (
            <p>
              회원가입이 성공적으로 완료되었습니다! <br />
              지금 바로 서비스를 이용하실 수 있습니다. 🎉
            </p>
          ),
          confirm: () => navigate(ROUTES.PAYMENT.QR),
        });
      }
    },
    onError: async (error: HTTPError) => {
      const json: ApiResponseError = await error.response.json();
      openDialog('alert', {
        title: json.error.code,
        description: <p>{json.error.message || '서버 오류가 발생했습니다.'}</p>,
      });
    },
  });

  const onSubmit = (data: SignupFormData) => {
    mutate({ email: data.email, password: data.password });
  };

  useEffect(() => {
    if (password.length > 0) {
      setValue('confirmPassword', watch('confirmPassword'), {
        shouldValidate: true, // ✅ 비밀번호가 변경되면 confirmPassword의 유효성 검사 실행
      });
    }
  }, [password, setValue]);

  useEffect(() => {
    if (agreements.terms || agreements.privacy) {
      setValue('agreements.terms', watch('agreements.terms'), {
        shouldValidate: true,
      });
    }
  }, [agreements.terms, agreements.privacy, setValue]);

  return (
    <PageLayout className='pt-12 pb-16'>
      <div className='max-w-md mx-auto'>
        <h1 className='text-2xl font-semibold text-center pb-8'>회원가입</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
          {/* 이메일 입력 */}
          <div className='flex flex-col gap-1'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='example@email.com'
              autoComplete='username'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className='flex flex-col gap-1'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              placeholder='영문 + 숫자 포함 (5자 이상)'
              autoComplete='new-password'
              {...register('password')}
            />
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className='flex flex-col gap-1'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Input
              id='confirmPassword'
              type='password'
              placeholder='비밀번호를 한 번 더 입력해주세요'
              autoComplete='new-password'
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* 약관 동의 */}
          <div className='flex flex-col gap-1'>
            <div className='flex flex-col gap-2 p-4 border rounded-md'>
              <Label className='font-semibold'>약관 동의</Label>

              {/* 전체 동의 */}
              <div className='flex items-center gap-2'>
                <Checkbox
                  id='all'
                  checked={isAllChecked}
                  onCheckedChange={(checked) =>
                    handleAllChecked(checked === true)
                  }
                />
                <Label htmlFor='all'>전체 동의</Label>
              </div>

              <hr className='my-2' />

              {/* 필수 약관 */}
              <Controller
                name='agreements.terms'
                control={control}
                render={({ field }) => (
                  <div className='flex items-center gap-2'>
                    <Checkbox
                      id='terms'
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        handleAgreementChange('terms')(checked === true);
                      }}
                    />
                    <Label htmlFor='terms'>이용약관 동의 (필수)</Label>
                  </div>
                )}
              />

              <Controller
                name='agreements.privacy'
                control={control}
                render={({ field }) => (
                  <div className='flex items-center gap-2'>
                    <Checkbox
                      id='privacy'
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        handleAgreementChange('privacy')(checked === true);
                      }}
                    />
                    <Label htmlFor='privacy'>
                      개인정보처리방침 동의 (필수)
                    </Label>
                  </div>
                )}
              />

              {/* 선택 약관 */}
              <Controller
                name='agreements.marketing'
                control={control}
                render={({ field }) => (
                  <div className='flex items-center gap-2'>
                    <Checkbox
                      id='marketing'
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        handleAgreementChange('marketing')(checked === true);
                      }}
                    />
                    <Label htmlFor='marketing'>마케팅 수신 동의 (선택)</Label>
                  </div>
                )}
              />
            </div>
            {/* {(!agreements.terms || !agreements.privacy) && (
              <p className='text-red-500 text-sm'>
                필수 약관에 동의해야 합니다.
              </p>
            )} */}
            {(errors.agreements?.terms || errors.agreements?.privacy) && (
              <p className='text-red-500 text-sm'>
                {errors.agreements.terms?.message ||
                  errors.agreements.privacy?.message}
              </p>
            )}
          </div>

          {/* 회원가입 버튼 */}
          <Button
            type='submit'
            size='extraLarge'
            isPending={isPending}
            disabled={!isValid}
          >
            회원가입
          </Button>
        </form>

        <div className='text-center pt-2'>
          <button
            type='button'
            onClick={() => navigate(ROUTES.LOGIN)}
            className='text-zinc-400 text-sm hover:underline hover:text-blue-500'
          >
            로그인 하러가기
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignupPage;
