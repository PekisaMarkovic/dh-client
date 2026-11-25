"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { Toasts } from "@/components/core/toast/CustomToast";
// starts i18next in the browser (the same translations as on the server)
import "@/translations/config";

const MINUTE = 60 * 1000;

/** The cache of the requests the browser makes (the form, later more), the toasts and the translations */
const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: MINUTE, gcTime: 10 * MINUTE, retry: 1, refetchOnWindowFocus: false },
          mutations: { retry: 0 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toasts />
    </QueryClientProvider>
  );
};

export default Providers;
