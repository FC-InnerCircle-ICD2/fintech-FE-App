import useModal from '@hooks/useModal';
import type { TModalOptions } from '@stores/modal';
import { Button } from '@lib/shadcn/components/ui/button';

const 모달_옵션_테이블 = [
  {
    key: 'enableOverlay',
    type: 'boolean',
    description: '오버레이 사용 여부',
    defaultValue: 'true',
  },
  {
    key: 'enableOverlayClickClose',
    type: 'boolean',
    description: '오버레이 클릭으로 닫기 허용 여부',
    defaultValue: 'true',
  },
  {
    key: 'enableBackgroundScroll',
    type: 'boolean',
    description: '배경 스크롤 허용 여부',
    defaultValue: 'false',
  },
];

const 다이얼로그_옵션_테이블 = [
  {
    key: 'title',
    type: 'React.ReactNode',
    description: 'Dialog의 제목',
    defaultValue: '-',
    required: true,
  },
  {
    key: 'description',
    type: 'React.ReactNode',
    description: 'Dialog의 내용',
    defaultValue: '-',
    required: true,
  },
  {
    key: 'confirm',
    type: 'VoidFunction',
    description: 'confirm 버튼 콜백',
    defaultValue: '-',
    required: false,
  },
  {
    key: 'cancel',
    type: 'VoidFunction',
    description: 'cancel 버튼 콜백',
    defaultValue: '-',
    required: false,
  },
  {
    key: 'confirmButtonText',
    type: 'string',
    description: 'confirmButtonText 버튼 텍스트',
    defaultValue: '확인',
    required: false,
  },
  {
    key: 'cancelmButtonText',
    type: 'string',
    description: 'cancelmButtonText 버튼 텍스트',
    defaultValue: '취소',
    required: false,
  },
];

const ModalUITest = () => {
  const { openModal, openDialog, closeModal, closeAllModal } = useModal();
  const BorderStyle = `border-[1px] border-solid border-black`;
  const 다이얼_테스트_함수1 = () => {
    openDialog('confirm', {
      title: 'TITLE',
      description: '확인을 누르면 다이얼로그가 닫힘',
      confirm: closeModal,
    });
  };

  const 다이얼_테스트_함수2 = () => {
    openDialog('confirm', {
      title: 'TITLE',
      description: '확인을 누르면 열려있는 모달과 다이얼로그 전부 닫힘',
      confirm: closeAllModal,
    });
  };

  const 다이얼_테스트_함수3 = () => {
    openDialog('alert', {
      title: 'TITLE',
      description: '이 다이얼로그는 Alert입니다',
      confirm: closeModal,
    });
  };

  const 다이얼_테스트_함수4 = () => {
    openDialog('confirm', {
      title: 'TITLE',
      description: '이 다이얼로그는 Confirm입니다',
      confirm: closeModal,
    });
  };
  const 모달_테스트_함수 = (
    callback?: VoidFunction,
    options?: TModalOptions,
  ) => {
    if (options) {
      openModal(<Modal callback={callback} />, options);
    } else {
      openModal(<Modal callback={callback} />);
    }
  };
  return (
    <div className='w-[min(100%,1200px)] flex flex-col gap-20 py-8 min-h-[200dvh] mx-auto  bg-slate-50'>
      {/* Modal */}
      <section className='px-8'>
        <div className='pb-8'>
          <h1 className='font-bold text-2xl pb-8 text-start'>1. Modal</h1>
          <div className='pb-4'>
            <h2 className='font-bold text-xl text-start pb-2'>사용법</h2>
            <p className=' text-slate-600 text-[16px]'>
              *Modal은 useModal의 openModal의 두번째 인자를 통해서 옵션을 변경
              할 수 있습니다.
            </p>
          </div>
          <div className='pb-10'>
            <pre className='p-8 bg-slate-200 rounded-[8px]'>
              () =&gt; openModal(
              <span className='text-red-600 font-bold'>
                {`<`}Component /{`>`}
              </span>
              , <span className='text-red-600 font-bold'>options</span>)
            </pre>
          </div>
          <div className='overflow-auto'>
            <h3 className='font-bold pb-2'>
              openDialog 두번째 인자:{' '}
              <span className='text-red-600 font-bold'>options</span>
            </h3>
            <table className='min-w-[768px] w-full'>
              <thead>
                <tr className='bg-slate-300'>
                  <th className={`${BorderStyle} h-[36px] px-2`}>Key</th>
                  <th className={`${BorderStyle} h-[36px] px-2`}>Type</th>
                  <th className={`${BorderStyle} h-[36px] px-2`}>
                    Description
                  </th>
                  <th className={`${BorderStyle} h-[36px] px-2`}>
                    DefaultValue
                  </th>
                </tr>
              </thead>
              <tbody>
                {모달_옵션_테이블.map((data) => {
                  return (
                    <tr key={data.key}>
                      <td className={`${BorderStyle} h-[32px] px-2`}>
                        {data.key}
                      </td>
                      <td
                        className={`${BorderStyle} h-[32px] px-2 text-center`}
                      >
                        {data.type}
                      </td>
                      <td
                        className={`${BorderStyle} h-[32px] px-2 text-center`}
                      >
                        {data.description}
                      </td>
                      <td
                        className={`${BorderStyle} h-[32px] px-2 text-center`}
                      >
                        {data.defaultValue}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className='font-bold text-lg text-start pb-2'> 📌 테스트</h2>
          <hr className='pb-4' />
          <ul className='flex flex-col gap-4 list-decimal pl-4'>
            <li>
              <div className='flex items-center gap-4'>
                <Button
                  size={'sm'}
                  onClick={() => 모달_테스트_함수(() => closeModal())}
                >
                  Modal Open
                </Button>
                <p>
                  단일 모달 테스트,{' '}
                  <strong>모달이 정상적으로 화면에 렌더된다</strong>
                </p>
              </div>
            </li>
            <li>
              <div className='flex items-center gap-4'>
                <Button
                  size={'sm'}
                  onClick={() =>
                    모달_테스트_함수(() => closeModal(), {
                      enableOverlay: false,
                    })
                  }
                >
                  Modal Open
                </Button>
                <p>
                  단일 모달 테스트 - enableOverlay: false,{' '}
                  <strong>Overlay를 배경색이 transparent로 설정 </strong>
                </p>
              </div>
            </li>
            <li>
              <div className='flex items-center gap-4'>
                <Button
                  size={'sm'}
                  onClick={() =>
                    모달_테스트_함수(() => closeModal(), {
                      enableOverlayClickClose: false,
                    })
                  }
                >
                  Modal Open
                </Button>
                <p>
                  단일 모달 테스트 - enableOverlayClickClose: false,{' '}
                  <strong> Overlay를 눌러도 모달이 닫히지 않는다</strong>
                </p>
              </div>
            </li>
            <li>
              <div className='flex items-center gap-4'>
                <Button
                  size={'sm'}
                  onClick={() =>
                    모달_테스트_함수(() => closeModal(), {
                      enableBackgroundScroll: true,
                    })
                  }
                >
                  Modal Open
                </Button>
                <p>
                  단일 Modal 테스트 - enableBackgroundScroll: true,{' '}
                  <strong>모달이 렌더되어도 배경 스크롤이 가능해야한다</strong>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      {/* Dialog */}
      <section className='px-8'>
        <div className='pb-8'>
          <h1 className='font-bold text-2xl pb-8 text-start'>2. Dialog</h1>
          <div className='pb-4'>
            <h2 className='font-bold text-xl text-start'>사용법</h2>
          </div>
          <div className='pb-10'>
            <pre className='p-8 bg-slate-200 rounded-[8px]'>
              () =&gt; openDialog(
              <span className='text-red-600 font-bold'>type</span>,
              <span className='text-red-600 font-bold'>config</span>)
            </pre>
          </div>

          <div className='overflow-auto pb-10'>
            <h3 className='font-bold pb-2'>
              openDialog 첫번째 인자:{' '}
              <span className='text-red-600 font-bold'>type</span>
            </h3>
            <table className='min-w-[768px] w-full'>
              <thead>
                <tr className='bg-slate-300'>
                  <th className={`${BorderStyle} h-[36px] px-2`}>type</th>

                  <th className={`${BorderStyle} h-[36px] px-2`}>
                    DefaultValue
                  </th>
                  <th className={`${BorderStyle} h-[36px] px-2`}>
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`${BorderStyle} h-[32px] px-2 text-center`}>
                    "modal" | "dialog" <RequiredMark />
                  </td>

                  <td className={`${BorderStyle} h-[32px] px-2 text-center`}>
                    -
                  </td>
                  <td className={`${BorderStyle} h-[32px] px-2 text-center`}>
                    모달 타입 선택
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className=' overflow-auto'>
            <h3 className='font-bold pb-2'>
              openDialog 두번째 인자:{' '}
              <span className='text-red-600 font-bold'>config</span>
            </h3>
            <table className='min-w-[768px] w-full'>
              <thead>
                <tr className='bg-slate-300'>
                  <th className={`${BorderStyle} h-[36px] px-2`}>Key</th>
                  <th className={`${BorderStyle} h-[36px] px-2`}>type</th>
                  <th className={`${BorderStyle} h-[36px] px-2`}>
                    Description
                  </th>
                  <th className={`${BorderStyle} h-[36px] px-2`}>
                    DefaultValue
                  </th>
                </tr>
              </thead>
              <tbody>
                {다이얼로그_옵션_테이블.map((data) => {
                  return (
                    <tr key={data.key}>
                      <td className={`${BorderStyle} h-[32px] px-2`}>
                        {data.key} {data.required && <RequiredMark />}
                      </td>
                      <td
                        className={`${BorderStyle} h-[32px] px-2 text-center`}
                      >
                        {data.type}
                      </td>
                      <td
                        className={`${BorderStyle} h-[32px] px-2 text-center`}
                      >
                        {data.description}
                      </td>
                      <td
                        className={`${BorderStyle} h-[32px] px-2 text-center`}
                      >
                        {data.defaultValue}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className='font-bold text-lg text-start pb-2'> 📌 테스트</h2>
          <hr className='pb-4' />
          <ul className='flex flex-col gap-4 list-decimal pl-4'>
            <li>
              <div className='flex items-center gap-4'>
                <Button size={'sm'} onClick={다이얼_테스트_함수3}>
                  Alert Open
                </Button>
                <p>
                  단일 다이얼로그 테스트,{' '}
                  <strong>
                    다이얼로그(Alert)가 정상적으로 화면에 렌더된다
                  </strong>
                </p>
              </div>
            </li>
            <li>
              <div className='flex items-center gap-4'>
                <Button size={'sm'} onClick={다이얼_테스트_함수4}>
                  Confirm Open
                </Button>
                <p>
                  단일 다이얼로그 테스트,{' '}
                  <strong>
                    다이얼로그(Confirm)가 정상적으로 화면에 렌더된다
                  </strong>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 중첩 */}
      <section className='px-8'>
        <div className='pb-8'>
          <h1 className='font-bold text-2xl pb-8 text-start'>3. 중첩</h1>

          <h2 className='font-bold text-lg text-start pb-2'> 📌 테스트</h2>
          <hr className='pb-4' />
          <ul className='flex flex-col gap-4 list-decimal pl-4'>
            <li>
              <div className='flex items-center gap-4'>
                <Button
                  size={'sm'}
                  onClick={() => 모달_테스트_함수(다이얼_테스트_함수1)}
                >
                  Modal Open
                </Button>
                <p>
                  모달과 다이얼로그 중첩 테스트(단일 모달 닫기),{' '}
                  <strong>각각의 모달이 개별로 닫기가 가능해야한다</strong>
                </p>
              </div>
            </li>

            <li>
              <div className='flex items-center gap-4'>
                <Button
                  size={'sm'}
                  onClick={() => 모달_테스트_함수(다이얼_테스트_함수2)}
                >
                  Modal Open
                </Button>
                <p>
                  모달과 다이얼로그 중첩 테스트(다이얼로그에서 중첩된 모든 모달
                  닫기),{' '}
                  <strong>
                    마지막에 렌더된 다이얼로그에서 닫기를 하면 모든 모달이
                    닫아져야한다
                  </strong>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ModalUITest;

const Modal = ({ callback }: { callback?: VoidFunction }) => {
  const { closeModal } = useModal();
  return (
    <div className='bg-white flex flex-col gap-4 rounded-[12px] py-4 w-[400px]'>
      <div className='modal-header flex justify-between px-4'>
        <h2 className='font-bold'>TITLE</h2>
      </div>
      <div className='modal-body  px-4'>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla
          pariatur sit minima molestiae ad sint ex quam? Excepturi minus,
          voluptatibus eligendi aut officiis facilis commodi delectus sit
          quisquam, perferendis perspiciatis!
        </div>
      </div>
      <div className='modal-footer flex gap-2 px-4'>
        <Button className='w-full' variant={'outline'} onClick={closeModal}>
          CANCEL
        </Button>
        <Button className='w-full' onClick={callback}>
          OK
        </Button>
      </div>
    </div>
  );
};

const RequiredMark = () => {
  return <span className='text-red-600 text-[20px] align-middle'>*</span>;
};
