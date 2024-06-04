
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'

export const Sidebar = () => {

  const[extended,setExtended]=useState(false);

  return (
    <div className='Sidebar'>

        <div className='Top'>
        <img onClick={()=>setExtended(prev=>!prev)}className='Menu'src={assets.menu_icon} alt="" />

        <div className="new-chat">
        <img src={assets.plus_icon} alt="" />
        {extended?<p>New chat</p>:null}
        </div>
        
        {extended?
        <div className="Recent">
          <p className='Recent-title'>Recent</p>  
          <div className="Recent-entry">
            <img src={assets.message_icon} alt="" />
            <p>What is react..</p>
          </div>
        </div>
        :null}

        </div>

        <div className="Bottom">
            <div className="Bottom-items Recent-entry">
                <img src={assets.question_icon} alt="" />
               {extended? <p>Help</p>:null}
            </div>

            <div className="Bottom-items Recent-entry">
                <img src={assets.history_icon} alt="" />
                {extended? <p>Activity</p>:null}
            </div>

            <div className="Bottom-items Recent-entry">
                <img src={assets.setting_icon} alt="" />
                {extended? <p>Settings</p>:null}
            </div>

        </div>
    </div>
  )
}
