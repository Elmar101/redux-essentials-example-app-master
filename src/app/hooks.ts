import type { RootState, Dispatch } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useTypedDispatch = () => useDispatch<Dispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;