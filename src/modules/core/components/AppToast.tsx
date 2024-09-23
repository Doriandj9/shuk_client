import { useThemeMode } from "@/store/themeMode";
import { Alert, IconButton } from "@mui/material";
import { toast } from "sonner";
import CloseIcon from '@mui/icons-material/Close';


type AppToastProps = {
  status: "error" | "info" | "success" | "warning";
  id: string | number;
  message: string | React.ReactNode;
};

const AppToast: React.FC<AppToastProps> = ({ id, status, message }) => {
  const theme = useThemeMode((state) => state.theme);

  return (
    <Alert
      key={id}
      severity={status}
      variant="outlined"
      sx={{
        backgroundColor: theme !== "dark" ? "white" : "black",
        color: theme !== "dark" ? "black" : "white",
        padding: '1rem'
      }}
      action={
        <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                toast.dismiss(id);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
      }
    >
      {message}
    </Alert>
  );
};

export default AppToast;
