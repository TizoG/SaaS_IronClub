import { UserSidebar } from './components/userSidebar';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <UserSidebar />
            <main className="flex-1">{children}</main>
        </div>
    );
}
