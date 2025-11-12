export const Profile = () => {
  // This would typically come from user context/auth
  const userName = 'Dashboard User';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF9255] text-white font-semibold text-lg">
        {userInitial}
      </div>
    </div>
  );
};
