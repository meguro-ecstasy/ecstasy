import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <NavigationMenu className="w-full max-w-md mx-auto">
      <NavigationMenuList className="flex justify-center bg-white p-2 rounded-lg shadow-md">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg font-medium text-gray-800 hover:text-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
            メニュー
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white rounded-md shadow-lg p-2 min-w-[200px]">
            <NavigationMenuLink
              href="/protected/post-question"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md transition-colors duration-150 ease-in-out"
            >
              質問を投稿する
            </NavigationMenuLink>
            <NavigationMenuLink
              href="/protected/get-question"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md transition-colors duration-150 ease-in-out"
            >
              質問を閲覧する
            </NavigationMenuLink>
            <NavigationMenuLink
              href="/user/setting"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md transition-colors duration-150 ease-in-out"
            >
              プロフィールを編集する
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
