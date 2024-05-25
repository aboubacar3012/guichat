import { RootState } from "@/src/redux/store";
import { UserType } from "@/src/types/user.type";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";

type UserProfileProps = {
  users: UserType[];
}

const UserProfileList = ({ users }: UserProfileProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <>
      {users && users.map((user: any) => user.username !== auth?.user?.username ? (
        <UserProfile key={user.id} user={user} />
      ) : null)}
    </>
  );
}

export default UserProfileList;