// export default function Home() {
//   return (
//     <div>
//       <h1>Hello World</h1>
//       <button>Hello me!</button>
//     </div>
//   );
// }


'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to sign-in page on component mount
    router.replace('/sign-in');
  }, [router]);
  
  // This will be shown briefly during the redirect
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );
}
