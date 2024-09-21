import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
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
      <NavigationMenuList className="flex justify-center dark:bg-gray-800 bg-white p-2 rounded-lg space-x-2">
        <NavigationMenuItem className="flex-1">
          <NavigationMenuLink
            href="/protected/post-question"
            className="block text-center px-4 py-2 text-sm dark:text-gray-200 text-white dark:bg-gray-700 bg-blue-500 hover:bg-blue-600 dark:hover:bg-gray-600 rounded-md transition-colors duration-150 ease-in-out w-full"
          >
            質問を投稿する
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex-1">
          <NavigationMenuLink
            href="/protected/get-question"
            className="block text-center px-4 py-2 text-sm dark:text-gray-200 text-white dark:bg-gray-700 bg-blue-500 hover:bg-blue-600 dark:hover:bg-gray-600 rounded-md transition-colors duration-150 ease-in-out w-full"
          >
            質問を閲覧する
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex-1">
          <NavigationMenuLink
            href="/user/setting"
            className="block text-center px-4 py-2 text-sm dark:text-gray-200 text-white dark:bg-gray-700 bg-blue-500 hover:bg-blue-600 dark:hover:bg-gray-600 rounded-md transition-colors duration-150 ease-in-out w-full"
          >
            プロフィールを編集する
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
