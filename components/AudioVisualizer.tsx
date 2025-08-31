import React, { useRef, useEffect } from 'react';

interface AudioVisualizerProps {
  analyserNode: AnalyserNode | null;
  isActive: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ analyserNode, isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // FIX: `useRef<number>()` is invalid as it requires an initial value. Initializing with `null` and updating the type to `number | null`.
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserNode) return;

    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    const bufferLength = analyserNode.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameId.current = requestAnimationFrame(draw);

      if (!isActive) {
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      
      analyserNode.getByteFrequencyData(dataArray);

      canvasCtx.fillStyle = 'rgb(15 23 42 / 0.5)'; // bg-slate-900/50
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        
        const r = barHeight + 50 * (i/bufferLength);
        const g = 150 * (i/bufferLength);
        const b = 150;

        canvasCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      if(animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [analyserNode, isActive]);

  return <canvas ref={canvasRef} width="150" height="50" className="rounded-md" />;
};
