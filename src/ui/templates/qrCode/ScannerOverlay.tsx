import type { FC } from 'react';

interface ScannerOverlayProps {
  viewportRatio: {
    width: number;
    height: number;
  };
}

export const ScannerOverlay: FC<ScannerOverlayProps> = ({ viewportRatio }) => {
  const squareSize = 80;
  const squareX = (100 - squareSize) / 2;
  const squareY = (viewportRatio.height - squareSize) / 2;

  return (
    <div className='absolute inset-0'>
      <svg
        viewBox={`0 0 100 ${viewportRatio.height}`}
        className='w-full h-full'
        preserveAspectRatio='none'
      >
        <defs>
          <mask id='scan-area'>
            <rect width='100' height={viewportRatio.height} fill='white' />
            <rect
              x={squareX}
              y={squareY}
              width={squareSize}
              height={squareSize}
              rx='10'
              ry='10'
              fill='black'
            />
          </mask>
        </defs>

        <rect
          width='100'
          height={viewportRatio.height}
          fill='rgba(0, 0, 0, 0.5)'
          mask='url(#scan-area)'
        />

        <rect
          x={squareX}
          y={squareY}
          width={squareSize}
          height={squareSize}
          rx='10'
          ry='10'
          fill='none'
          stroke='rgba(250, 204, 21, 0.8)'
          strokeWidth='1.2'
        />
      </svg>
    </div>
  );
};
