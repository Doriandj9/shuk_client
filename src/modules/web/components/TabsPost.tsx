import AppItem from "@/modules/core/components/AppItem";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ImageIcon from '@mui/icons-material/Image';
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import { useContext, useState } from "react";
import TabPostText from "./TabsPost/TabPostText";
import { SchemasPostContext } from "@/modules/core/components/AppNewPost";
import { useAuthStore } from "@/store/auth";
import AppAvatar from "@/modules/core/components/AppAvatar";

type TabNum = 1 | 2 | 3;

const TabsPost = () => {
  const [tWeb] = useTranslation("web");
  const {user} = useAuthStore((state) => state);
  const [tab, setTab] = useState<TabNum>(1);
  const { changeSchema } = useContext(SchemasPostContext);

  const handleTab = (value: TabNum) => {
    let numSchema: 0 | 1 | 2 = 0;

    switch (value) {
      case 1:
        numSchema = 0;
        break;
      case 2:
        numSchema = 1;
        break;
      case 3:
        numSchema = 2;
        break;
      default:
        numSchema = 1;
        break;
    };

    changeSchema(numSchema);
    setTab(value);
  };

  return (<>
      <div>
        <AppAvatar  size="large" />
      </div>
    <div className="app-post-grid">
      <div className="post-grid-content">
        <AppItem>
          {tab === 1 &&
            <TabPostText />
          }

          {
            tab === 2 &&
            <p>2</p>
          }

          {
            tab == 3 &&
            <p>3</p>
          }

        </AppItem>
      </div>
      <div className="post-grid-navbar">
        <AppItem>
          <div className="flex justify-center items-center flex-row md:flex-col">
            <button onClick={() => handleTab(1)} type="button" className={`post-navbar-item ${tab == 1 ? 'tab-select' : ''}`}>
              <TextFieldsIcon fontSize="large" color="secondary" />
              <span className="">
                {tWeb('descriptions.post-text')}
              </span>
            </button>
            <div className="my-2 w-4 md:w-full">
              <Divider />
            </div>
            <button onClick={() => handleTab(2)} type="button" className={`post-navbar-item ${tab == 2 ? 'tab-select' : ''}`}>
              <ImageIcon fontSize="large" color="success" />
              <span className="">
                {tWeb('descriptions.post-img')}
              </span>
            </button>
            <div className="my-2 w-4 md:w-full">
              <Divider />
            </div>
            <button onClick={() => handleTab(3)} type="button" className={`post-navbar-item ${tab == 3 ? 'tab-select' : ''}`}>
              <VideoCameraBackIcon fontSize="large" color="warning" />
              <span className="">
                {tWeb('descriptions.post-video')}
              </span>
            </button>
          </div>
        </AppItem>
      </div>
      <div className="post-grid-menu">
        <AppItem>Menu</AppItem>
      </div>
    </div>
  </>);
};


export default TabsPost;