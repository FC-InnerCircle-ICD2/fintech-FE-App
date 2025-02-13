import { API_ENDPOINTS } from '@constants/apiEndpoints';
import { useSSE } from '@hooks/useSSE';
import Button from '@ui/components/button/Button';
import PageLayout from '@ui/layouts/PageLayout';
import { useState } from 'react';

const SSETest = () => {
  const [count, setCount] = useState<number>(0);
  const [messages, setMessages] = useState<string[]>([]);
  const { connected, isReceivingData, connect, disconnect } = useSSE<{
    message: string;
  }>({
    url: API_ENDPOINTS.PAYMENT.ORDER.SSE,
    onMessage: (data) => {
      console.log(data);
      setMessages((prev) => [...prev, data.message]);
    },
  });
  return (
    <PageLayout className='w-responsive_container mx-auto'>
      <div className=' overflow-auto h-[100dvh] bg-white'>
        <div className='flex'>
          <Button
            variant={'secondary'}
            onClick={() => setCount((prev) => prev + 1)}
          >
            Rerender {count}
          </Button>
          <Button onClick={connect} disabled={connected}>
            SSE 연결
          </Button>
          <Button
            variant={'destructive'}
            onClick={disconnect}
            disabled={!connected}
          >
            SSE 연결 해제
          </Button>
        </div>

        <h1>SSE 연결 상태: {connected ? '연결됨' : '연결 안 됨'}</h1>
        <h2>데이터 수신 상태: {isReceivingData ? '정상' : '끊김'}</h2>
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      </div>
    </PageLayout>
  );
};

export default SSETest;
