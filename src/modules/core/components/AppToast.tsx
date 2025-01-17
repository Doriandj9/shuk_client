import { useThemeMode } from "@/store/themeMode";
import { Alert, IconButton } from "@mui/material";
import { toast } from "sonner";
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';


type AppToastProps = {
  status: "error" | "info" | "success" | "warning" | "loading";
  id: string | number;
  message: string | React.ReactNode;
  fullWidth?: boolean;
};

const AppToast: React.FC<AppToastProps> = ({ id, status, message, fullWidth }) => {
  const theme = useThemeMode((state) => state.theme);
  const optionalPropsSxAlert= {};
  if(fullWidth){
    Reflect.set(optionalPropsSxAlert,'width','100%');
  }
  return (
    <Alert
      key={id}
      severity={status === 'loading' ? 'info' : status}
      variant="outlined"
      sx={{
        backgroundColor: theme !== "dark" ? "white" : "black",
        color: theme !== "dark" ? "black" : "white",
        padding: '1rem',
        ...optionalPropsSxAlert
      }}
      icon={ status === 'loading' ? <CircularProgress sx={{margin: 0}} size={20} color="inherit" /> : undefined }
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
