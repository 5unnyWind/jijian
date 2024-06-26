export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-background z-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}