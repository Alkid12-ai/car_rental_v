import NotFoundView from "@/components/NotFoundView";
import { defaultLocale, getDictionary } from "@/i18n";

const t = getDictionary(defaultLocale);

/**
 * `not-found.tsx` receives no route params, so the `<title>` uses the default
 * locale. The visible copy and every link come from `<NotFoundView />`, which
 * reads the locale from the layout's provider.
 */
export const metadata = {
  title: t.meta.notFoundTitle,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundView />;
}
