import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      document?.getElementById("my_modal_1")?.showModal();
      setTimerActive(true);
      setTimeLeft(59);
    } else {
      setTimerActive(false);
    }
  }, [isOpen]);
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(59); // Countdown timer starting at 59 seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timerActive, timeLeft]);
  const handleOtpChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      // Only allow numbers
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (value.length === 1 && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };
  const handleRequestNewOtp = () => {
    // onRequestNewOtp();
    // Reset timer
    setTimeLeft(59);
    setTimerActive(true);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // console.log("OTP submitted:", otp.join(""));
  };
  return ReactDOM.createPortal(
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Verify OTP!</h3>
        <p className="py-4">
          Please enter the OTP sent toy your registered Email
        </p>
        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              className="w-12 h-12 text-center border rounded"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </div>
        <div className="mb-4">
          <p className="text-sm">
            {timerActive
              ? `Resend OTP in ${timeLeft}s`
              : "You can request a new OTP now."}
          </p>
        </div>
        {otp.length === 4 && (
          <div className="flex justify-center">
            <div>
            {!timerActive && (
              <button type="button" onClick={handleRequestNewOtp} className="btn w-full mb-3">
                Request New OTP
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="btn btn-success text-white w-full"
            >
              Submit
            </button>
            </div>
          </div>
        )}

        <div className="modal-action">
          <form method="dialog">
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>,
    document.body // Render the modal into the body element
  );
};

export default Modal;
