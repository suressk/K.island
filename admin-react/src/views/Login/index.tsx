import React, { memo } from "react";
import styles from './index.module.scss'

interface ILoginProps {

}
/**
 * @description 登录✌️
 * @author Saul
 * @date 14/09/2021
 * @return {*} 
 */
const Index: React.FC<ILoginProps> = (): JSX.Element => {

  return (
    <section className={styles.login_wrapper}>
      Login
    </section>
  )
}

export default memo(Index)