import AppAvatar from "@/modules/core/components/AppAvatar";
import { User } from "../@types/web";
import { mergeUserProvider } from "@/modules/core/utilities/mergeUserProvider";

type HeaderProfileProps= {
    user: User | null;
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({user}) => {
    return (
        <>
            <div className="w-full flex flex-col items-center">
                <div>
                    <AppAvatar size="profile" user={mergeUserProvider(user || {id: -1})} />
                </div>
                <h3 className="text-mode-white font-regular text-xl mt-1">
                    {user?.full_name}
                </h3>
            </div>
        </>
    );
};

export default HeaderProfile;