import Sidebar from '@/components/sharedComponents/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
        <div className={'w-1/3'}>
            <Sidebar />
        </div>

      <main className=" w-2/3 min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}
