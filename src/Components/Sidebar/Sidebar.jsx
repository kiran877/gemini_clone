import './Sidebar.css';
import { assets } from '../../assets/assets';
import { useContext, useState } from 'react';
import { Context } from '../../Context/Context';

export const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onsent, prevPrompt, setRecentPrompt,newChat} = useContext(Context);

  const loadprompt =async(prompt)=>{
    setRecentPrompt(prompt)
    await onsent(prompt)
  }

  return (
    <div className='Sidebar'>
      <div className='Top'>
        <img 
          onClick={() => setExtended(prev => !prev)} 
          className='Menu' 
          src={assets.menu_icon} 
          alt="Menu Icon" 
        />

        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended ? <p>New chat</p> : null}
        </div>

        {extended && (
          <div className="Recent">
            <p className='Recent-title'>Recent</p>
            {prevPrompt.map((item, index) => (
              <div onClick={()=>loadprompt(item)} className="Recent-entry" key={index}>
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0,18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="Bottom">
        <div className="Bottom-items Recent-entry">
          <img src={assets.question_icon} alt="Question Icon" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="Bottom-items Recent-entry">
          <img src={assets.history_icon} alt="History Icon" />
          {extended ? <p>Activity</p> : null}
        </div>

        <div className="Bottom-items Recent-entry">
          <img src={assets.setting_icon} alt="Setting Icon" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};
