import {
  toast,
  ToastOptions,
  Slide,
  Id,
  ToastContent,
  ToastContainer,
} from 'react-toastify';

export const defaultToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Slide,
};

type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default';

export default function Toast(
  type: ToastType,
  content: ToastContent,
  options: Partial<ToastOptions> = {},
): Id {
  const optionsToApply = { ...defaultToastOptions, ...options };

  switch (type) {
    case 'success':
      return toast.success(content, optionsToApply);
    case 'error':
      return toast.error(content, optionsToApply);
    case 'info':
      return toast.info(content, optionsToApply);
    case 'warning':
      return toast.warning(content, optionsToApply);
    case 'default':
      return toast(content, optionsToApply);
  }
}

export const ToastProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};
