import { useEffect, useState } from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD: "ADD_TOAST",
  UPDATE: "UPDATE_TOAST",
  DISMISS: "DISMISS_TOAST",
  REMOVE: "REMOVE_TOAST",
} as const;

let toastCounter = 0;
const genId = () => `${++toastCounter}`;

type Action =
  | { type: typeof actionTypes.ADD; toast: ToasterToast }
  | { type: typeof actionTypes.UPDATE; toast: Partial<ToasterToast> & { id: string } }
  | { type: typeof actionTypes.DISMISS; toastId?: string }
  | { type: typeof actionTypes.REMOVE; toastId?: string };

interface State {
  toasts: ToasterToast[];
}

let memoryState: State = { toasts: [] };
const listeners: Array<(state: State) => void> = [];
const timeouts = new Map<string, ReturnType<typeof setTimeout>>();

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

const scheduleRemoval = (id: string) => {
  if (timeouts.has(id)) return;

  const timeout = setTimeout(() => {
    timeouts.delete(id);
    dispatch({ type: actionTypes.REMOVE, toastId: id });
  }, TOAST_REMOVE_DELAY);

  timeouts.set(id, timeout);
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS:
      state.toasts.forEach((toast) => {
        if (!action.toastId || toast.id === action.toastId) {
          scheduleRemoval(toast.id);
        }
      });

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          !action.toastId || t.id === action.toastId ? { ...t, open: false } : t
        ),
      };

    case actionTypes.REMOVE:
      if (!action.toastId) return { ...state, toasts: [] };

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
}

type ToastInput = Omit<ToasterToast, "id">;

export function toast(props: ToastInput) {
  const id = genId();

  const dismiss = () => dispatch({ type: actionTypes.DISMISS, toastId: id });

  dispatch({
    type: actionTypes.ADD,
    toast: {
      id,
      open: true,
      ...props,
      onOpenChange: (open) => !open && dismiss(),
    },
  });

  return {
    id,
    dismiss,
    update: (newProps: Partial<ToasterToast>) =>
      dispatch({ type: actionTypes.UPDATE, toast: { ...newProps, id } }),
  };
}

export function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);

    return () => {
      const index = listeners.indexOf(setState);
      if (index !== -1) listeners.splice(index, 1);
    };
  }, []); // ❗ correct dependency — do NOT add state here

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) =>
      dispatch({ type: actionTypes.DISMISS, toastId }),
  };
}
  