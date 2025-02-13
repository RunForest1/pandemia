import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ProfileManage } from '../../molecules/ProfileManage';

export const RightSide = () => {

  return (
    <aside className="">
       <Tabs className='flex items-start'>
        <TabList className='flex flex-col items-center px-7 py-14 gap-10'>
          <Tab className='p-2 rounded-xl hover:bg-gray2 focus:bg-gray3 text-white duration-300' selectedClassName='bg-black2'><ManageAccountsOutlinedIcon sx={{ color: 'gray', fontSize: 32 }}/></Tab>
          <Tab className='p-2 rounded-xl hover:bg-gray2 focus:bg-gray3 text-white duration-300' selectedClassName='bg-black2'><ShoppingCartOutlinedIcon sx={{ color: 'gray', fontSize: 32 }}/></Tab>
          <Tab className='p-2 rounded-xl hover:bg-gray2 focus:bg-gray3 text-white duration-300' selectedClassName='bg-black2'><AssignmentOutlinedIcon sx={{ color: 'gray', fontSize: 32 }}/></Tab>
          <Tab className='p-2 rounded-xl hover:bg-gray2 focus:bg-gray3 text-white duration-300' selectedClassName='bg-black2'><PendingActionsOutlinedIcon sx={{ color: 'gray', fontSize: 32 }}/></Tab>
          <Tab className='p-2 rounded-xl hover:bg-gray2 focus:bg-gray3 text-white duration-300' selectedClassName='bg-black2'><SettingsOutlinedIcon sx={{ color: 'gray', fontSize: 32 }}/></Tab>
        </TabList>

        <TabPanel className='w-full'>
          <ProfileManage/>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 4</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 5</h2>
        </TabPanel>
      </Tabs>
    </aside>
  )
}
