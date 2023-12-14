import { ConfigProvider,App as AntdApp } from 'antd';
import { RouterProvider } from 'react-router-dom';
import "./App.css"
import router from "./router/index"
import AntdGlobal from './utils/AntdGlobal';

function App () { 

  return <ConfigProvider theme={{
    token: {
      colorPrimary: '#ed6c00',
    },
  }}>
    <AntdApp>
      <AntdGlobal/>
      <RouterProvider router={router}/>
    </AntdApp>
  </ConfigProvider>
}

export default App