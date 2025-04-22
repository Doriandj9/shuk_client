import AppItem from "@/modules/core/components/AppItem";
import TextFieldsIcon from '@mui/icons-material/TextFields';
// import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ImageIcon from '@mui/icons-material/Image';
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import TabPostText from "./TabsPost/TabPostText";
import { useAuthStore } from "@/store/auth";
import AppAvatar from "@/modules/core/components/AppAvatar";
import TextMenuPost from "./TabsMenuPost/TextMenuPost";
import TabPostImg from "./TabsPost/TabPostImg";
import { PostTypesBack } from "@/modules/core/@types/post";
import { usePostStore } from "@/store/postStore";
import { WrappingTagCategories } from "./WrappingTagCategories";


type TabNum = 1 | 2 | 3;

const TabsPost = () => {
  const [tWeb] = useTranslation("web");
  const { user } = useAuthStore((state) => state);
  const updateType = usePostStore((state) => state.updateType);
  const [tab, setTab] = useState<TabNum>(1);


  const handleTab = (value: TabNum, type: PostTypesBack) => {
    updateType(type);
    setTab(value);
  };

  useEffect(() => {
    updateType('PT');
  }, []);

  return (<>
    <div className="flex gap-2 items-center mb-2">
      <AppAvatar size="large" />
      <h4 className="font-bold text-sm">{user?.full_name}</h4>
    </div>
    <div className="app-post-grid">
      <div className="post-grid-content">
        <AppItem>
          <div className="flex flex-col">
            <div className="border-b flex flex-col gap-1 h-24 overflow-x-auto">
              <div className="">
                <h4 className="text-start text-xs text-mode-slate font-bold
                  ">{tWeb('titles.tag-post')}</h4>
              </div>
              <div className="flex-gow flex gap-1">
                <WrappingTagCategories />
              </div>
            </div>
            {tab === 1 &&
              <TabPostText />
            }

            {
              tab === 2 &&
              <TabPostImg />
            }

            {
              tab == 3 &&
              <p>3</p>
            }
          </div>

        </AppItem>
      </div>
      <div className="post-grid-navbar">
        <AppItem>
          <div className="flex justify-center items-center flex-row md:flex-col">
            <button onClick={() => handleTab(1, 'PT')} type="button" className={`post-navbar-item ${tab == 1 ? 'tab-select' : ''}`}>
              <TextFieldsIcon fontSize="large" color="secondary" />
              <span className="">
                {tWeb('descriptions.post-text')}
              </span>
            </button>
            <div className="my-2 w-4 md:w-full">
              <Divider />
            </div>
            <button onClick={() => handleTab(2, 'PI')} type="button" className={`post-navbar-item ${tab == 2 ? 'tab-select' : ''}`}>
              <ImageIcon fontSize="large" color="success" />
              <span className="">
                {tWeb('descriptions.post-img')}
              </span>
            </button>
            {/* <div className="my-2 w-4 md:w-full">
              <Divider />
            </div> */}
            {/* <button onClick={() => handleTab(3)} type="button" className={`post-navbar-item ${tab == 3 ? 'tab-select' : ''}`}>
              <VideoCameraBackIcon fontSize="large" color="warning" />
              <span className="">
                {tWeb('descriptions.post-video')}
              </span>
            </button> */}
          </div>
        </AppItem>
      </div>
      <div className="post-grid-menu">
        <AppItem>
          {
            tab === 1 &&
            <TextMenuPost />
          }

        </AppItem>
      </div>
    </div>
  </>);
};


export default TabsPost;