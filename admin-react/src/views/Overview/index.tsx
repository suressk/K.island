import React, { memo } from "react";

interface IOverviewProps {

}
/**
 * @description 首页 - 概览
 * @author Saul
 * @date 14/09/2021
 * @return {*} 
 */
const Index: React.FC<IOverviewProps> = (): JSX.Element => {

  return (
    <div>
      overview
    </div>
  )
}

export default memo(Index)