const UserAvatar = ({ src, name, size = "md" }) => {
  // Get first letter of each word in the name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2); // Only take first two initials
  };

  const sizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12"
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full relative overflow-hidden`}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-[#EA8D8D] to-[#A890FE] flex items-center justify-center text-white font-medium">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
};

export default UserAvatar; 