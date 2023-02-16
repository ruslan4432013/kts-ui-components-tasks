import React from 'react'
import s from './WithLoader.module.scss'
import { Loader, LoaderSize } from '../Loader/Loader'


export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({loading, children}) => {
  return (
    <div className={s.root}>
      {loading && <Loader className={s.loader} size={LoaderSize.s}/>}
      {children}
    </div>
  )
}
