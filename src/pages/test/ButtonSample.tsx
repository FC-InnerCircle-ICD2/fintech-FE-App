import Button from '@ui/components/button/Button';

const ButtonSample = () => {
  return (
    <div className='p-10 w-full flex flex-col gap-10 overflow-x-auto'>
      <div className='flex flex-col gap-3'>
        <h3 className='text-[1.4rem] font-medium'>Default</h3>
        <div className='flex gap-3'>
          <Button width={'fit'} leftIcon='Camera' rightIcon='List'>
            Button
          </Button>
          <Button width={'fit'} rounded>
            Button
          </Button>
          <Button width={'fit'} isPending>
            Button
          </Button>
          <Button width={'fit'} disabled onClick={() => alert('click')}>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='small'>
            Button
          </Button>
          <Button width={'fit'} size='small' rounded>
            Button
          </Button>
          <Button width={'fit'} size='small' isPending>
            Button
          </Button>
          <Button width={'fit'} size='small' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='medium'>
            Button
          </Button>
          <Button width={'fit'} size='medium' rounded>
            Button
          </Button>
          <Button width={'fit'} size='medium' isPending>
            Button
          </Button>
          <Button width={'fit'} size='medium' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='large'>
            Button
          </Button>
          <Button width={'fit'} size='large' rounded>
            Button
          </Button>
          <Button width={'fit'} size='large' isPending>
            Button
          </Button>
          <Button width={'fit'} size='large' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='extraLarge'>
            Button
          </Button>
          <Button width={'fit'} size='extraLarge' rounded>
            Button
          </Button>
          <Button width={'fit'} size='extraLarge' isPending>
            Button
          </Button>
          <Button width={'fit'} size='extraLarge' disabled>
            Button
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <h3 className='text-[1.4rem] font-medium'>Secondary</h3>
        <div className='flex gap-3'>
          <Button width={'fit'} variant='secondary'>
            Button
          </Button>
          <Button width={'fit'} variant='secondary' rounded>
            Button
          </Button>
          <Button width={'fit'} variant='secondary' isPending>
            Button
          </Button>
          <Button width={'fit'} variant='secondary' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='small' variant='secondary'>
            Button
          </Button>
          <Button width={'fit'} size='small' variant='secondary' rounded>
            Button
          </Button>
          <Button width={'fit'} size='small' variant='secondary' isPending>
            Button
          </Button>
          <Button width={'fit'} size='small' variant='secondary' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='medium' variant='secondary'>
            Button
          </Button>
          <Button width={'fit'} size='medium' variant='secondary' rounded>
            Button
          </Button>
          <Button width={'fit'} size='medium' variant='secondary' isPending>
            Button
          </Button>
          <Button width={'fit'} size='medium' variant='secondary' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='large' variant='secondary'>
            Button
          </Button>
          <Button width={'fit'} size='large' variant='secondary' rounded>
            Button
          </Button>
          <Button width={'fit'} size='large' variant='secondary' isPending>
            Button
          </Button>
          <Button width={'fit'} size='large' variant='secondary' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='extraLarge' variant='secondary'>
            Button
          </Button>
          <Button width={'fit'} size='extraLarge' variant='secondary' rounded>
            Button
          </Button>
          <Button width={'fit'} size='extraLarge' variant='secondary' isPending>
            Button
          </Button>
          <Button width={'fit'} size='extraLarge' variant='secondary' disabled>
            Button
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <h3 className='text-[1.4rem] font-medium'>Destructive</h3>
        <div className='flex gap-3'>
          <Button width={'fit'} variant='destructive'>
            Button
          </Button>
          <Button width={'fit'} variant='destructive' rounded>
            Button
          </Button>
          <Button width={'fit'} variant='destructive' isPending>
            Button
          </Button>
          <Button width={'fit'} variant='destructive' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='small' variant='destructive'>
            Button
          </Button>
          <Button width={'fit'} size='small' variant='destructive' rounded>
            Button
          </Button>
          <Button width={'fit'} size='small' variant='destructive' isPending>
            Button
          </Button>
          <Button width={'fit'} size='small' variant='destructive' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='medium' variant='destructive'>
            Button
          </Button>
          <Button width={'fit'} size='medium' variant='destructive' rounded>
            Button
          </Button>
          <Button width={'fit'} size='medium' variant='destructive' isPending>
            Button
          </Button>
          <Button width={'fit'} size='medium' variant='destructive' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='large' variant='destructive'>
            Button
          </Button>
          <Button width={'fit'} size='large' variant='destructive' rounded>
            Button
          </Button>
          <Button width={'fit'} size='large' variant='destructive' isPending>
            Button
          </Button>
          <Button width={'fit'} size='large' variant='destructive' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='extraLarge' variant='destructive'>
            Button
          </Button>
          <Button width={'fit'} size='extraLarge' variant='destructive' rounded>
            Button
          </Button>
          <Button
            width={'fit'}
            size='extraLarge'
            variant='destructive'
            isPending
          >
            Button
          </Button>
          <Button
            width={'fit'}
            size='extraLarge'
            variant='destructive'
            disabled
          >
            Button
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <h3 className='text-[1.4rem] font-medium'>Outline_default</h3>
        <div className='flex gap-3'>
          <Button width={'fit'} variant='outline_default'>
            Button
          </Button>
          <Button width={'fit'} variant='outline_default' rounded>
            Button
          </Button>
          <Button width={'fit'} variant='outline_default' isPending>
            Button
          </Button>
          <Button width={'fit'} variant='outline_default' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='small' variant='outline_default'>
            Button
          </Button>
          <Button width={'fit'} size='small' variant='outline_default' rounded>
            Button
          </Button>
          <Button
            width={'fit'}
            size='small'
            variant='outline_default'
            isPending
          >
            Button
          </Button>
          <Button width={'fit'} size='small' variant='outline_default' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='medium' variant='outline_default'>
            Button
          </Button>
          <Button width={'fit'} size='medium' variant='outline_default' rounded>
            Button
          </Button>
          <Button
            width={'fit'}
            size='medium'
            variant='outline_default'
            isPending
          >
            Button
          </Button>
          <Button
            width={'fit'}
            size='medium'
            variant='outline_default'
            disabled
          >
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='large' variant='outline_default'>
            Button
          </Button>
          <Button width={'fit'} size='large' variant='outline_default' rounded>
            Button
          </Button>
          <Button
            width={'fit'}
            size='large'
            variant='outline_default'
            isPending
          >
            Button
          </Button>
          <Button width={'fit'} size='large' variant='outline_default' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='extraLarge' variant='outline_default'>
            Button
          </Button>
          <Button
            width={'fit'}
            size='extraLarge'
            variant='outline_default'
            rounded
          >
            Button
          </Button>
          <Button
            width={'fit'}
            size='extraLarge'
            variant='outline_default'
            isPending
          >
            Button
          </Button>
          <Button
            width={'fit'}
            size='extraLarge'
            variant='outline_default'
            disabled
          >
            Button
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <h3 className='text-[1.4rem] font-medium'>Outline_primary</h3>
        <div className='flex gap-3'>
          <Button width={'fit'} variant='outline_primary'>
            Button
          </Button>
          <Button width={'fit'} variant='outline_primary' rounded>
            Button
          </Button>
          <Button width={'fit'} variant='outline_primary' isPending>
            Button
          </Button>
          <Button width={'fit'} variant='outline_primary' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='small' variant='outline_primary'>
            Button
          </Button>
          <Button width={'fit'} size='small' variant='outline_primary' rounded>
            Button
          </Button>
          <Button
            width={'fit'}
            size='small'
            variant='outline_primary'
            isPending
          >
            Button
          </Button>
          <Button width={'fit'} size='small' variant='outline_primary' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='medium' variant='outline_primary'>
            Button
          </Button>
          <Button width={'fit'} size='medium' variant='outline_primary' rounded>
            Button
          </Button>
          <Button
            width={'fit'}
            size='medium'
            variant='outline_primary'
            isPending
          >
            Button
          </Button>
          <Button
            width={'fit'}
            size='medium'
            variant='outline_primary'
            disabled
          >
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='large' variant='outline_primary'>
            Button
          </Button>
          <Button width={'fit'} size='large' variant='outline_primary' rounded>
            Button
          </Button>
          <Button
            width={'fit'}
            size='large'
            variant='outline_primary'
            isPending
          >
            Button
          </Button>
          <Button width={'fit'} size='large' variant='outline_primary' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='extraLarge' variant='outline_primary'>
            Button
          </Button>
          <Button
            width={'fit'}
            size='extraLarge'
            variant='outline_primary'
            rounded
          >
            Button
          </Button>
          <Button
            width={'fit'}
            size='extraLarge'
            variant='outline_primary'
            isPending
          >
            Button
          </Button>
          <Button
            width={'fit'}
            size='extraLarge'
            variant='outline_primary'
            disabled
          >
            Button
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <h3 className='text-[1.4rem] font-medium'>Outline_ghost</h3>
        <div className='flex gap-3'>
          <Button width={'fit'} variant='outline_ghost'>
            Button
          </Button>
          <Button width={'fit'} variant='outline_ghost' rounded>
            Button
          </Button>
          <Button width={'fit'} variant='outline_ghost' isPending>
            Button
          </Button>
          <Button width={'fit'} variant='outline_ghost' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='small' variant='outline_ghost'>
            Button
          </Button>
          <Button width={'fit'} size='small' variant='outline_ghost' rounded>
            Button
          </Button>
          <Button width={'fit'} size='small' variant='outline_ghost' isPending>
            Button
          </Button>
          <Button width={'fit'} size='small' variant='outline_ghost' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='medium' variant='outline_ghost'>
            Button
          </Button>
          <Button width={'fit'} size='medium' variant='outline_ghost' rounded>
            Button
          </Button>
          <Button width={'fit'} size='medium' variant='outline_ghost' isPending>
            Button
          </Button>
          <Button width={'fit'} size='medium' variant='outline_ghost' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='large' variant='outline_ghost'>
            Button
          </Button>
          <Button width={'fit'} size='large' variant='outline_ghost' rounded>
            Button
          </Button>
          <Button width={'fit'} size='large' variant='outline_ghost' isPending>
            Button
          </Button>
          <Button width={'fit'} size='large' variant='outline_ghost' disabled>
            Button
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button width={'fit'} size='extraLarge' variant='outline_ghost'>
            Button
          </Button>
          <Button
            width={'fit'}
            size='extraLarge'
            variant='outline_ghost'
            rounded
          >
            Button
          </Button>
          <Button
            width={'fit'}
            size='extraLarge'
            variant='outline_ghost'
            isPending
          >
            Button
          </Button>
          <Button
            width={'fit'}
            size='extraLarge'
            variant='outline_ghost'
            disabled
          >
            Button
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonSample;
