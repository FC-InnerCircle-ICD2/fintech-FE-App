import { useNavigate } from 'react-router-dom';
import PageLayout from '@ui/layouts/PageLayout';
import Button from '@ui/components/button/Button';
import { Input } from '@lib/shadcn/components/ui/input';
import { Label } from '@lib/shadcn/components/ui/label';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { cardService } from '@api/services/card';
import { useMutation } from '@tanstack/react-query';
import type { CardRegisterReq } from '@type/requests/card';

const AddCardPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ['registerCard'],
    mutationFn: (cardData: CardRegisterReq) =>
      cardService.registerCard(cardData),
    onSuccess: () => {
      navigate('/card');
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      expirationPeriod: '',
      cvc: '',
      isRepresentative: true,
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .matches(/^(\d{4} \d{4} \d{4} \d{4})$/, 'Card number must be 16 digits')
        .required('Card number is required'),
      expirationPeriod: Yup.string()
        .matches(
          /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
          'Expiration date must be in MM/YY format',
        )
        .required('Expiration date is required'),
      cvc: Yup.string()
        .matches(/^[0-9]{3}$/, 'Invalid CVC')
        .required('CVC is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      mutate(values);
    },
  });
  return (
    <PageLayout
      className='w-full h-full flex flex-col p-6'
      style={{
        backgroundImage: `radial-gradient(
          circle at top right,
          rgba(60, 20, 136, 0.6) 0%,
          rgba(75, 71, 180, 0.6) 20%,
          rgba(95, 122, 199, 0.6) 40%,
          rgba(64, 134, 147, 0.6) 60%,
          rgba(30, 127, 132, 0.6) 80%,
          rgba(30, 127, 132, 0.6) 100%
        )`,
      }}
    >
      <div className='w-full max-w-md mx-auto'>
        <h1 className='text-2xl font-bold text-white mb-8'>카드 등록</h1>

        <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6'>
          <div className='bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-xl p-6 mb-6'>
            <div className='flex justify-between items-center mb-8'>
              <div className='text-sm'>Credit Card</div>
              <div className='text-lg font-bold'>VISA</div>
            </div>
            <div className='text-xl tracking-[4px] font-mono mb-8'>
              {formik.values.cardNumber || '•••• •••• •••• ••••'}
            </div>
            <div className='flex justify-between items-end'>
              <div>
                <div className='text-xs opacity-80'>VALID THRU</div>
                <div className='font-medium'>
                  {formik.values.expirationPeriod || 'MM/YY'}
                </div>
              </div>
              <div className='text-right'>
                <div className='text-xs opacity-80'>CVC</div>
                <div className='font-medium'>{formik.values.cvc || '•••'}</div>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-2 mb-6 px-2'>
            <input
              type='checkbox'
              id='isRepresentative'
              name='isRepresentative'
              checked={formik.values.isRepresentative}
              onChange={formik.handleChange}
              className='w-4 h-4 rounded border-white/30 bg-white/20 checked:bg-blue-500'
            />
            <label htmlFor='isRepresentative' className='text-white text-sm'>
              주 카드로 설정
            </label>
          </div>

          <form onSubmit={formik.handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <Label className='text-white text-md'>Card Number</Label>
              <Input
                type='text'
                name='cardNumber'
                placeholder='0000 0000 0000 0000'
                value={formik.values.cardNumber}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/\D/g, '');
                  if (value.length > 16) {
                    value = value.slice(0, 16);
                  }
                  value = value.replace(/(.{4})/g, '$1 ').trim();
                  formik.setFieldValue('cardNumber', value);
                }}
                onBlur={formik.handleBlur}
                className='bg-white/20 border-white/30 text-white placeholder:text-white/50'
              />
              {formik.touched.cardNumber && formik.errors.cardNumber ? (
                <div className='text-red-500 text-sm'>
                  {formik.errors.cardNumber}
                </div>
              ) : null}
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label className='text-white text-md'>Expire Date</Label>
                <Input
                  type='text'
                  name='expirationPeriod'
                  placeholder='MM/YY'
                  value={formik.values.expirationPeriod}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/\D/g, '');
                    if (value.length > 2) {
                      value = value.slice(0, 2) + '/' + value.slice(2);
                    }
                    if (value.length > 5) {
                      value = value.slice(0, 5);
                    }
                    formik.setFieldValue('expirationPeriod', value);
                  }}
                  onBlur={formik.handleBlur}
                  className='bg-white/20 border-white/30 text-white placeholder:text-white/50'
                />
                {formik.touched.expirationPeriod &&
                formik.errors.expirationPeriod ? (
                  <div className='text-red-500 text-sm'>
                    {formik.errors.expirationPeriod}
                  </div>
                ) : null}
              </div>
              <div className='space-y-2'>
                <Label className='text-white text-md'>CVC</Label>
                <Input
                  type='text'
                  name='cvc'
                  placeholder='123'
                  value={formik.values.cvc}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/\D/g, '');
                    if (value.length > 3) {
                      value = value.slice(0, 3);
                    }
                    formik.setFieldValue('cvc', value);
                  }}
                  onBlur={formik.handleBlur}
                  className='bg-white/20 border-white/30 text-white placeholder:text-white/50'
                />
                {formik.touched.cvc && formik.errors.cvc ? (
                  <div className='text-red-500 text-sm'>
                    {formik.errors.cvc}
                  </div>
                ) : null}
              </div>
            </div>
          </form>
        </div>

        <Button
          type='submit'
          className='w-full text-white rounded-full'
          variant='default'
          size='large'
          disabled={
            formik.values.cardNumber.length !== 19 ||
            formik.values.expirationPeriod.length !== 5 ||
            formik.values.cvc.length !== 3
          }
          isPending={isPending}
        >
          카드 등록
        </Button>
      </div>
    </PageLayout>
  );
};

export default AddCardPage;
