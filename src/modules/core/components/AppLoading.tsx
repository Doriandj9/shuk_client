import { appTheme } from "@/config/app";
import { useThemeMode } from "@/store/themeMode";
import { Backdrop, CircularProgress } from "@mui/material";

type AppLoadingProps = {
  isOpen: boolean;
};

const AppLoading: React.FC<AppLoadingProps> = ({ isOpen }) => {
  const themeMode = useThemeMode((state) => state.theme);

  return (
    <>
        <Backdrop
          sx={(theme) => ({
            backgroundColor:
              themeMode === "system" || themeMode === "light"
                ? "rgba(250,250,250,0.75)"
                : "rgba(250,250,250,0.25)",
            zIndex: appTheme.zIndex?.drawer
              ? appTheme.zIndex?.drawer + 1
              : 999,
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            color: theme.palette.secondary.light,
          })}
          open={isOpen}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    </>
  );
};

export default AppLoading;
