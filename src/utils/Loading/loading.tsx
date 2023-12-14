import { Spin, Flex } from 'antd';


export default function Loading ({tip="Loading..."}:{tip?:string}) {
  return(
  <Flex gap="small" vertical>
    <Spin tip={tip} size="large">
    <div className="content"></div>
    </Spin>
  </Flex>)
  
}

