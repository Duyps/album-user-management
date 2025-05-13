export default function UserAvatar({ name, size = 32 }) {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&rounded=true`;
    return <img src={avatarUrl} alt={`Avatar of ${name}`} width={size} height={size} />;
}